import { Session } from "../../../lib/models/Session";
import connect from "../../../lib/mongoose";
import { object, string } from "yup";
import validate from "../../../lib/requestValidation/validate";
import { User } from "../../../lib/models/User";
import { compare } from "../../../lib/hash";
import { generateSession } from "../../../lib/sessions";
import request from "request-ip";
import sendVerificationMail from "../../../lib/mail";
import { usernameRegex } from "../../../lib/utils/common";
import { getCookie, setCookie } from "../../../lib/cookies";
import { obfuscateMail } from "../../../lib/utils";
import { Request, Response, notAllowed, internalError } from "../../../lib/api";

const schema = object({
	username: string().min(3).max(24).matches(usernameRegex).default(undefined),
	email: string().lowercase().email().default(undefined),
	password: string().min(1).required()
})
	.test("usernameOrEmail", "Username or email is required.", (value) => !!(value.username || value.email))
	.noUnknown();

export default async function login(req: Request<"/users/login">, res: Response<"/users/login">) {
	try {
		switch (req.method) {
			case "POST":
				const d = validate(req.body, schema);
				const isUsername = !!d.username;

				//If it works it works :/
				if (d.error)
					return res.status(400).json({
						success: false,
						status: 400,
						name: "INVALID_DATA",
						message: "Invalid request.",
						fields: d
					});

				await connect();

				//Remove the existing session if any
				const session = getCookie(req, "session");
				if (session) {
					setCookie(res, "session", "");
					await Session.deleteOne({ token: session });
				}

				//Find the code document and delete it
				return User.findOne({ [isUsername ? "username" : "email"]: d[isUsername ? "username" : "email"] }).then(async (user) => {
					if (!user)
						return res.status(400).json({
							success: false,
							status: 400,
							name: "INVALID_DATA",
							message: `Could not find user with that ${isUsername ? "username" : "email"}.`,
							fields: isUsername
								? {
										username: "Could not find user with that username."
								  }
								: {
										email: "Could not find user with that email."
								  }
						});

					if (!compare(d.password, user.password))
						return res.status(400).json({
							success: false,
							status: 400,
							name: "INVALID_DATA",
							message: "The password you entered is incorrect.",
							fields: {
								password: "The password you entered is incorrect."
							}
						});

					//Create a session
					const { token, code } = await generateSession(user._id, user.mfaEnabled, user.emailVerified, request.getClientIp(req) ?? undefined, req.headers["user-agent"]);

					//Set the cookie
					setCookie(res, "session", token);

					//Send the verification email if MFA is enabled
					if (typeof code === "string") {
						sendVerificationMail(user.email, code);
						return res.status(401).json({
							success: false,
							status: 401,
							name: "VERIFICATION_REQUIRED",
							message: "Verification is required to login.",
							email: obfuscateMail(user.email)
						});
					}

					//Send the success response
					return res.status(200).json({ status: 200, success: true });
				});
			default:
				return notAllowed(req, res);
		}
	} catch (err) {
		return internalError(err, res);
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
