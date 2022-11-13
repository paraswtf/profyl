import type { NextApiRequest, NextApiResponse } from "next";
import APIError from "../../../lib/utils/APIError";
import { object, string, boolean } from "yup";
import hash from "../../../lib/hash";
import validate from "../../../lib/requestValidation/validate";
import { User } from "../../../lib/models/User";
import { checkDuplicates } from "./validate";
import sendVerificationMail from "../../../lib/mail";
import request from "request-ip";
import { generateSession } from "../../../lib/sessions";
import Cookies from "js-cookie";

const schema = object()
	.shape({
		username: string()
			.required()
			.min(3)
			.max(24)
			.matches(/(?!^[\.\_])(?![\.\_]$)(?!.*[\.\_]{2,})^[a-zA-Z0-9\.\_]+$/),
		password: string()
			.required()
			.min(8)
			.matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])^.+$/),
		email: string().lowercase().required().email(),
		emailSubscription: boolean().default(false)
	})
	.noUnknown();

//Return success response
export interface SuccessResponse {
	success: true;
}

export default async function register(req: NextApiRequest, res: NextApiResponse<SuccessResponse | APIError>) {
	switch (req.method) {
		case "POST":
			const d = validate(req.body, schema);
			if (d instanceof APIError) return APIError.badRequest(req, res, d);

			//Check if already exists
			const err = await checkDuplicates(d.username, d.email);
			if (err instanceof APIError) return APIError.badRequest(req, res, err);

			//Hash the password
			d.password = hash(d.password);

			//Create the user
			User.create(d)
				.then(async (user) => {
					//Create a session
					const { token, code } = await generateSession(user._id, true, false, request.getClientIp(req) ?? undefined, req.headers["user-agent"]);

					//Set the cookie
					Cookies.set("session", token, { expires: 7 });

					//Send the verification email
					typeof code === "string" ? sendVerificationMail(d.email, code) : null;

					//Send the success response
					res.status(200).json({ success: true });
				})
				.catch((err) => APIError.internalError(req, res));
			break;
		default:
			APIError.notAllowed(req, res);
	}
}
