import type { NextApiRequest, NextApiResponse } from "next";
import { Session } from "../../../lib/models/Session";
import connect from "../../../lib/mongoose";
import APIError from "../../../lib/utils/APIError";
import { object, string } from "yup";
import validate from "../../../lib/requestValidation/validate";
import { User } from "../../../lib/models/User";
import { compare } from "../../../lib/hash";
import { generateSession } from "../../../lib/sessions";
import request from "request-ip";
import Cookies from "js-cookie";
import sendVerificationMail from "../../../lib/mail";
import { usernameRegex } from "../../../lib/utils/common";

const schema = object()
	.shape({
		username: string().min(3).max(24).matches(usernameRegex).default(undefined),
		email: string().lowercase().email().default(undefined),
		password: string().min(1).required()
	})
	.test("usernameOrEmail", "Username or email is required.", (value) => !!(value.username || value.email))
	.noUnknown();

export default async function login(req: NextApiRequest, res: NextApiResponse<any>) {
	switch (req.method) {
		case "POST":
			const d = validate(req.body, schema);
			if (d instanceof APIError) return APIError.badRequest(req, res, d);
			const isUsername = !!d.username;

			await connect();

			//Remove the existing session if any
			const session = Cookies.get("session");
			if (session) {
				Cookies.remove("session");
				await Session.deleteOne({ token: session }).catch(() => null);
			}

			//Find the code document and delete it
			User.findOne({ [isUsername ? "username" : "email"]: d[isUsername ? "username" : "email"] })
				.then(async (user) => {
					if (!user) return APIError.unauthorized(req, res, new APIError({ status: 401, name: "USER_NOT_FOUND", message: "User not found." }));
					if (!compare(d.password, user.password)) return res.status(401).json(new APIError({ status: 401, name: "INCORRECT_PASSWORD", message: "Incorrect password." }));

					//Create a session
					const { token, code } = await generateSession(user._id, user.mfaEnabled, user.emailVerified, request.getClientIp(req) ?? undefined, req.headers["user-agent"]);

					//Set the cookie
					Cookies.set("session", token, { expires: 7 });

					//Send the verification email if MFA is enabled
					typeof code === "string" ? sendVerificationMail(user.email, code) : null;

					//Send the success response
					res.status(200).json({ success: true, emailSent: typeof code === "string", email: user.email, mfaEnabled: user.mfaEnabled });
				})
				.catch(() => APIError.internalError(req, res));
			break;
		default:
			APIError.notAllowed(req, res);
	}
}

export type LoginRequest = {
	password: string;
} & ({ username: string; email: undefined } | { email: string; username: undefined });

export type LoginResponse = {
	success: boolean;
	emailSent: boolean;
	email: string;
	mfaEnabled: boolean;
};
