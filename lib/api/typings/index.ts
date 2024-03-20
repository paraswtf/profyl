import { NextApiRequest, NextApiResponse } from 'next';
import { ApiPingRoute } from './ping';
import { ApiUrlsGetRoute, ApiUrlsPostRoute } from './urls';

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
//These errors will be displayed below the form fields
export type ValidationError<T extends { body: any }> = ErrorResponse & {
    status: 400;
    name: 'INVALID_DATA';
    fields: {
        [K in keyof T['body']]?: string;
    };
};
export type MethodNotAllowedError = ErrorResponse & {
    status: 405;
    name: 'METHOD_NOT_ALLOWED';
};
export type InternalServerError = ErrorResponse & {
    status: 500;
    name: 'INTERNAL_SERVER_ERROR';
};
