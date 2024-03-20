import { NextApiRequest, NextApiResponse } from 'next';

//Method to handle all api requests
export default async function request<
    T extends keyof ApiPathList,
    //Method of the request
    M extends ApiPathList[T]['request']['method'],
    //Response type of the request
    R extends (ApiPathList[T] & { request: { method: M } })['response'],
>(
    method: M,
    path: T,
    body: (ApiPathList[T]['request'] & { method: M })['body']
): Promise<R> {
    return {} as R;
}

const d = request('POST', '/urls', {
    //Types for the body work, but the response type doesn't
    //Type of d is Promise<ApiUrlsGetResponse | ApiUrlsPostResponse>
    //It should be Promise<ApiUrlsPostResponse> because the method is 'POST'
    target: 'test',
    password: 'test',
});

// Types to handle server side request handling
export type Request<T extends keyof ApiPathList> = Omit<
    NextApiRequest,
    'body' & 'method'
> &
    ApiPathList[T]['request'];

export type Response<T extends keyof ApiPathList> = NextApiResponse<
    ApiPathList[T]['response']
>;
export interface ApiPathList {
    '/ping': ApiPingRoute;
    '/urls': ApiUrlsGetRoute | ApiUrlsPostRoute;
}

export type RequestMethod = ApiPathList[keyof ApiPathList]['request']['method'];

/**
 * Success Responses
 */

export interface SuccessResponse {
    success: true;
    status: 200;
}

/**
 * Error Responses
 */
export interface ErrorResponse {
    success: false;
    status: number;
    name: string; //This is the name of the error in the format of "ERROR_NAME"
    message: string; //This is the message that should be displayed to the user
}

export type ApiPingRoute = {
    request: ApiPingRequest;
    response: ApiPingResponse;
};
export type ApiUrlsPostRoute = {
    request: ApiUrlsPostRequest;
    response: ApiUrlsPostResponse;
};
export type ApiUrlsGetRoute = {
    request: ApiUrlsGetRequest;
    response: ApiUrlsGetResponse;
};

// ALL: /api/ping
export interface ApiPingRequest {
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    body: {};
}
export interface ApiPingResponse extends SuccessResponse {
    message: 'Pong!';
}

// POST: /api/urls
export interface ApiUrlsPostRequest {
    method: 'POST';
    body: {
        target: string;
        password?: string;
        slug?: string;
    };
}
export interface ApiUrlsPostResponse extends SuccessResponse {
    slug: string;
    target: string;
    updateKey: string;
}

// GET: /api/urls
export interface ApiUrlsGetRequest {
    method: 'GET';
    body: {
        slug: string;
        password?: string;
    };
}
export interface ApiUrlsGetResponse extends SuccessResponse {
    target: string;
}
