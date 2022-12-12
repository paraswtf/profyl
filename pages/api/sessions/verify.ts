import { MFA } from "../../../lib/models/MFA";
import { Session } from "../../../lib/models/Session";
import connect from "../../../lib/mongoose";
import { object, string } from "yup";
import validate from "../../../lib/requestValidation/validate";
import { User } from "../../../lib/models/User";
import { Request, Response, notAllowed, internalError } from "../../../lib/api";

const schema = object({
	code: string().required("Missing 'code'.").length(6, "Invalid 'code'.").matches(/^\d+$/, "Invalid 'code'.")
}).noUnknown();

export default async function verify(req: Request<"/sessions/verify">, res: Response<"/sessions/verify">) {
	try {
		switch (req.method) {
			case "POST":
				const d = validate(req.body, schema);

				if (d.error)
					return res.status(400).json({
						success: false,
						status: 400,
						name: "INVALID_DATA",
						message: "Invalid json in request.",
						fields: d
					});

				await connect();

				//Find the code document and delete it
				return MFA.findOneAndDelete({ code: d.code }).then((mfa) => {
					//If the code is not found, invalid code
					if (!mfa)
						return res.status(400).json({
							success: false,
							status: 400,
							name: "INVALID_DATA",
							message: "Could not find code.",
							fields: {
								code: "Invalid 'code'."
							}
						});

					//Find the session and update it
					Session.findByIdAndUpdate({ _id: mfa.sessionID }, { verified: true, emailVerified: true }).then((session) => {
						//If the session is not found, invalid code
						if (!session)
							return res.status(400).json({
								success: false,
								status: 400,
								name: "INVALID_DATA",
								message: "Could not find session.",
								fields: {
									code: "Invalid 'code'."
								}
							});

						//Set the user to verifiedEmail in case it isnt already
						if (!session.emailVerified) User.findByIdAndUpdate({ _id: session.userId }, { emailVerified: true });

						//If the session was found, return success
						return res.status(200).json({
							status: 200,
							success: true,
							userId: session.userId
						});
					});
				});
			default:
				return notAllowed(req, res);
		}
	} catch (err) {
		return internalError(err, res);
	}
}
