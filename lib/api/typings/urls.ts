import {
    ErrorResponse,
    InternalServerError,
    MethodNotAllowedError,
    SuccessResponse,
    ValidationError,
} from '.';

export type ApiUrlsPostRoute = {
    request: ApiUrlsPostRequest;
    response:
        | ApiUrlsPostResponse
        | ApiUrlsPostErrorResponse
        | MethodNotAllowedError
        | InternalServerError;
};
export type ApiUrlsGetRoute = {
    request: ApiUrlsGetRequest;
    response:
        | ApiUrlsGetResponse
        | ApiUrlsGetErrorResponse
        | MethodNotAllowedError
        | InternalServerError;
};

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
export type ApiUrlsPostErrorResponse = ValidationError<ApiUrlsPostRequest>;

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
export type ApiUrlsGetErrorResponse = ErrorResponse &
    (
        | ValidationError<ApiUrlsGetRequest>
        | {
              status: 404;
              name: 'NOT_FOUND';
          }
    );
