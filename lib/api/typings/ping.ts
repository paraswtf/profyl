import { InternalServerError, SuccessResponse } from '.';

export type ApiPingRoute = {
    request: ApiPingRequest;
    response: ApiPingResponse | InternalServerError;
};
// ALL: /api/ping
export interface ApiPingRequest {
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    body: {};
}
export interface ApiPingResponse extends SuccessResponse {
    message: 'Pong!';
}
