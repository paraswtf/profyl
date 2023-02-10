import { NextApiRequest, NextApiResponse } from 'next';

// Types to handle server side request handling
export type Request<T extends keyof ApiPathList> = Omit<
    NextApiRequest,
    'body'
> & { body: ApiPathList[T]['request'] };
export type Response<T extends keyof ApiPathList> = NextApiResponse<
    ApiPathList[T]['response']
>;

//Method to handle all api requests
export default async function request<T extends keyof ApiPathList>(
    path: T,
    body: ApiPathList[T]['request']
): Promise<ApiPathList[T]['response']> {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(
                `http://${process.env.NEXT_PUBLIC_HOSTNAME}/api${path}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                }
            );
            resolve(await res.json());
        } catch (e) {
            reject(e);
        }
    });
}

// Methods to handle server side responses
export function notAllowed(
    req: NextApiRequest,
    res: NextApiResponse<MethodNotAllowedError>
) {
    return res.status(405).json({
        success: false,
        status: 405,
        message: `'${req.method || 'GET'}' not allowed at '${req.url || '/'}'`,
        name: 'METHOD_NOT_ALLOWED',
    });
}

export function internalError(err: any, res: NextApiResponse) {
    //todo: log error in sentry or smth
    return res.status(500).json({
        success: false,
        status: 500,
        message: 'Internal server error.',
        name: 'INTERNAL_SERVER_ERROR',
    });
}

//List of all the API routes and their responses
//All api routes only accept POST requests
//All api routes return JSON
//All api routes return a success property which is a boolean
//All api routes return a status property which is a number

export interface ApiPathList {
    '/urls/generate': {
        request: ApiUrlsGenerateRequest;
        response:
            | ApiUrlsGenerateResponse
            | ApiUrlsGenerateErrorResponse
            | MethodNotAllowedError
            | InternalServerError;
    };
    '/urls/geturl': {
        request: ApiUrlsGetUrlRequest;
        response:
            | ApiUrlsGetUrlResponse
            | ApiUrlsGetUrlErrorResponse
            | MethodNotAllowedError
            | InternalServerError;
    };
    '/urls/validate': {
        request: ApiUrlsValidateRequest;
        response:
            | ApiUrlsValidateResponse
            | ApiUrlsValidateErrorResponse
            | MethodNotAllowedError
            | InternalServerError;
    };
    '/ask/notifications': {
        request: ApiAskNotificationsRequest;
        response:
            | ApiAskNotificationsResponse
            | ApiAskNotificationsErrorResponse
            | MethodNotAllowedError
            | InternalServerError;
    };
    '/ping': {
        request: ApiPingRequest;
        response:
            | ApiPingResponse
            | ApiPingErrorResponse
            | MethodNotAllowedError
            | InternalServerError;
    };
}

export interface SuccessResponse {
    success: true;
    status: 200;
}
export interface ErrorResponse {
    success: false;
    status: number;
    name: string; //This is the name of the error in the format of "ERROR_NAME"
    message: string; //This is the message that should be displayed to the user
}
//These errors will be displayed below the form fields
export type ValidationError<T> = ErrorResponse & {
    status: 400;
    name: 'INVALID_DATA';
    fields: {
        [K in keyof T]?: string;
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
// /api/urls/generate
export interface ApiUrlsGenerateRequest {
    url: string;
    password?: string;
    slug?: string;
}
export interface ApiUrlsGenerateResponse extends SuccessResponse {
    slug: string;
}
export type ApiUrlsGenerateErrorResponse =
    ValidationError<ApiUrlsGenerateRequest>;

// /api/urls/geturl
export interface ApiUrlsGetUrlRequest {
    slug: string;
    password?: string;
}
export interface ApiUrlsGetUrlResponse extends SuccessResponse {
    url: string;
}
export type ApiUrlsGetUrlErrorResponse = ErrorResponse &
    (
        | ValidationError<ApiUrlsGetUrlRequest>
        | {
              status: 404;
              name: 'NOT_FOUND';
          }
    );

// /api/urls/validate
export interface ApiUrlsValidateRequest {
    slug: string;
}
export interface ApiUrlsValidateResponse extends SuccessResponse {
    success: true;
}
export type ApiUrlsValidateErrorResponse =
    ValidationError<ApiUrlsValidateRequest>;

// /api/ask/notifications
export type ApiAskNotificationsRequest =
    //For get requests
    | {}
    //For post requests
    | {
          slug: string;
          message: string;
      }
    //For patch requests
    | {
          updateKey: string;
          message: string;
      };

export type ApiAskNotificationsResponse = SuccessResponse &
    //For get requests
    (| {
              notifications: {
                  message: string;
              }[];
          }
        //For post requests
        | {
              updateKey: string;
          }
        //For patch requests
        | {}
    );
export type ApiAskNotificationsErrorResponse = ErrorResponse &
    (
        | {
              status: 401;
              name: 'LOGIN_REQUIRED';
          }
        | ValidationError<ApiAskNotificationsRequest>
    );

// /api/ping
export interface ApiPingRequest {}
export interface ApiPingResponse extends SuccessResponse {
    message: string;
}
export type ApiPingErrorResponse = InternalServerError;
