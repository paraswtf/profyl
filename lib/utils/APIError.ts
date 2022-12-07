import { NextApiRequest, NextApiResponse } from "next";

export default class APIError {
	//The http status code
	public readonly status: number;
	//The error message
	public readonly message: string;
	//The internal api error name
	public readonly name: APIErrorName;
	//The internal api error code
	public readonly code: APIErrorCode;

	constructor({ status, message, name }: { status: number; name: APIErrorName; message: string }) {
		this.status = status;
		this.message = message;
		this.name = name;
		this.code = APIErrors[name];
	}

	public static notAllowed(req: NextApiRequest, res: NextApiResponse) {
		return res.status(405).json(new APIError({ status: 405, message: `'${req.method || "GET"}' not allowed at '${req.url || "/"}'`, name: "METHOD_NOT_ALLOWED" }));
	}

	public static badRequest(req: NextApiRequest, res: NextApiResponse, message: APIError) {
		return res.status(400).json(message);
	}

	public static unauthorized(req: NextApiRequest, res: NextApiResponse, message: APIError) {
		return res.status(401).json(message);
	}

	public static internalError(err: any, res: NextApiResponse) {
		return res.status(500).json(new APIError({ status: 500, message: "Internal Server Error", name: "INTERNAL_SERVER_ERROR" }));
	}
}

const APIErrors = {
	//4xx
	BAD_REQUEST: 400,
	INVALID_USERNAME: 4001,
	INVALID_EMAIL: 4002,
	INVALID_PASSWORD: 4003,
	UNAUTHORIZED: 401,
	USER_NOT_FOUND: 4010,
	INCORRECT_PASSWORD: 4010,
	NOT_FOUND: 404,
	METHOD_NOT_ALLOWED: 405,
	CONFLICT: 409,
	USERNAME_ALREADY_EXISTS: 4090,
	EMAIL_ALREADY_EXISTS: 4091,
	USERNAME_AND_EMAIL_ALREADY_EXISTS: 4092,
	INVALID_CODE: 4093,
	//5xx
	INTERNAL_SERVER_ERROR: 500
} as const;

type APIErrorName = keyof typeof APIErrors;
type APIErrorCode = typeof APIErrors[APIErrorName];
