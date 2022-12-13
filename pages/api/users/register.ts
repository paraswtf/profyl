import { object, string, boolean } from "yup";
import hash from "../../../lib/hash";
import validate from "../../../lib/requestValidation/validate";
import { User } from "../../../lib/models/User";
import { checkDuplicates } from "./validate";
import sendVerificationMail from "../../../lib/mail";
import request from "request-ip";
import { generateSession } from "../../../lib/sessions";
import { usernameRegex } from "../../../lib/utils/common";
import { setCookie } from "../../../lib/cookies";
import { Request, Response, notAllowed, internalError } from "../../../lib/api";
import { obfuscateMail } from "../../../lib/utils";

const schema = object({
	username: string().required().min(3).max(24).matches(usernameRegex),
	password: string().required().min(8),
	email: string().lowercase().required().email(),
	emailSubscription: boolean().default(false)
}).noUnknown();

export default async function register(req: Request<"/users/register">, res: Response<"/users/register">) {
	try {
		switch (req.method) {
			case "POST":
				const d = validate(req.body, schema);
				if (d.error)
					return res.status(400).json({
						success: false,
						status: 400,
						name: "INVALID_DATA",
						message: "Invalid request.",
						fields: d
					});

				//Check if already exists
				const err = await checkDuplicates(d.username, d.email);
				if (err)
					return res.status(400).json({
						success: false,
						status: 400,
						name: "INVALID_DATA",
						message: `User with ${err.email ? "email" : "username"} already exists.`,
						fields: err
					});

				//Hash the password
				d.password = hash(d.password);

				//Create the user
				User.create(d).then(async (user) => {
					//Create a session
					const { token, code, verificationToken } = await generateSession(user._id, true, false, request.getClientIp(req) ?? undefined, req.headers["user-agent"]);

					//Set the cookie
					setCookie(res, "session", token);

					//Send the verification email
					if (code || verificationToken) sendVerificationMail(d.email, code, verificationToken);

					//Send the success response
					res.status(200).json({ status: 200, success: true, email: obfuscateMail(d.email) });
				});
				break;
			default:
				return notAllowed(req, res);
		}
	} catch (err) {
		return internalError(req, res);
	}
}
