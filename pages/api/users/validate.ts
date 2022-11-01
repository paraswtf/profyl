import type { NextApiRequest, NextApiResponse } from "next";
import APIError from "../../../lib/utils/APIError";
import { object, string } from "yup";
import validateSchema from "../../../lib/requestValidation/validate";
import { User } from "../../../lib/models/User";
import connect from "../../../lib/mongoose";

const schema = object()
	.shape({
		username: string()
			.required()
			.min(3)
			.max(24)
			.matches(/(?!^[\.\_])(?![\.\_]$)(?!.*[\.\_]{2,})^[a-zA-Z0-9\.\_]+$/),
		email: string().lowercase().required().email()
	})
	.noUnknown();

export interface SuccessResponse {
	username: string;
	email: string;
}

export default async function validate(req: NextApiRequest, res: NextApiResponse<SuccessResponse | APIError>) {
	switch (req.method) {
		case "POST":
			const d = validateSchema(req.body, schema);
			if (d instanceof APIError) return APIError.badRequest(req, res, d);

			const err = await checkDuplicates(d.username, d.email);
			if (err instanceof APIError) return APIError.badRequest(req, res, err);

			res.status(200).json(d);
			break;
		default:
			APIError.notAllowed(req, res);
	}
}

export async function checkDuplicates(username: string, email: string) {
	await connect();
	const d = {
		email: !!(await User.exists({ email })),
		username: !!(await User.exists({ username }))
	};

	//If it is duplicate error
	if (d.email || d.username) {
		let name;
		let message = "";
		if (d.email && d.username) {
			name = "USERNAME_AND_EMAIL_ALREADY_EXISTS" as const;
			message = "Username and email already exists.";
		} else if (d.email) {
			name = "EMAIL_ALREADY_EXISTS" as const;
			message = "Email already exists.";
		} else {
			name = "USERNAME_ALREADY_EXISTS" as const;
			message = "Username already exists.";
		}

		return new APIError({ status: 409, name, message });
	}

	return null;
}
