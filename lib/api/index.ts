import { NextApiRequest, NextApiResponse } from 'next';
import { ApiPathList, MethodNotAllowedError } from './typings';

//Method to handle all api requests
export default async function request<
    T extends keyof ApiPathList,
    //Method of the request
    M extends ApiPathList[T]['request']['method'],
    //Response type of the request
    R extends (ApiPathList[T] & {
        request: {
            method: M;
        };
    })['response'],
>(
    method: M,
    path: T,
    body: (ApiPathList[T]['request'] & { method: M })['body']
): Promise<R> {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(
                `http${
                    process.env.NEXT_PUBLIC_VERCEL_ENV.toLowerCase().startsWith(
                        'dev'
                    )
                        ? ''
                        : 's'
                }://${process.env.NEXT_PUBLIC_VERCEL_URL}/api${path}`,
                {
                    method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: method === 'GET' ? undefined : JSON.stringify(body),
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
