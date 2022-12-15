import { MFA } from "../../../lib/models/MFA";
import { Session } from "../../../lib/models/Session";
import connect from "../../../lib/mongoose";
import { object, string } from "yup";
import validate from "../../../lib/requestValidation/validate";
import { User } from "../../../lib/models/User";
import { Request, Response, notAllowed, internalError } from "../../../lib/api";
import jwt from "jsonwebtoken";
import { getCookie } from "../../../lib/cookies";

const schema = object({
	code: string().length(6, "Invalid 'code'.").matches(/^\d+$/, "Invalid 'code'."),
	verificationToken: string()
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

				//Token based verification
				if (d.verificationToken) {
					//Verify token, will go to catch if invalid
					return jwt.verify(d.verificationToken, process.env.JWT_SECRET, async (err, decoded: any) => {
						if (err || !decoded)
							return res.status(400).json({
								success: false,
								status: 400,
								name: "INVALID_DATA",
								message: "Invalid verification token.",
								fields: {
									verificationToken: "Invalid verification token."
								}
							});

						//If the token is verified ensure connection
						await connect();
						//Find the unverified session and verify it
						return Session.findByIdAndUpdate({ _id: decoded.sessionID, verified: false }, { verified: true }).then((session) => {
							//If the session is not found, invalid token
							if (!session)
								return res.status(400).json({
									success: false,
									status: 400,
									name: "INVALID_DATA",
									message: "Invalid verification token.",
									fields: {
										verificationToken: "Invalid verification token."
									}
								});
							//Set the user to verifiedEmail in case it isnt already
							if (!session.emailVerified) User.findByIdAndUpdate({ _id: session.userID }, { emailVerified: true });

							//Return success
							return res.status(200).json({
								status: 200,
								success: true,
								userID: session.userID
							});
						});
					});
				}

				//Code based verification
				const token = getCookie(req, "session");
				if (!token)
					return res.status(400).json({
						success: false,
						status: 400,
						name: "INVALID_DATA",
						message: "No valid unverified session.",
						fields: {
							verificationToken: "No valid unverified session."
						}
					});

				return jwt.verify(token, process.env.JWT_SECRET, async (err, decoded: any) => {
					if (err || !decoded)
						return res.status(400).json({
							success: false,
							status: 400,
							name: "INVALID_DATA",
							message: "No valid unverified session.",
							fields: {
								verificationToken: "No valid unverified session."
							}
						});

					//Ensure connection
					await connect();

					//Find the code document and delete it
					return MFA.findOneAndDelete({ code: d.code, sessionID: decoded.sessionID }).then((mfa) => {
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
						return Session.findByIdAndUpdate({ _id: mfa.sessionID }, { verified: true, emailVerified: true }).then((session) => {
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
							if (!session.emailVerified) User.findByIdAndUpdate({ _id: session.userID }, { emailVerified: true });

							//If the session was found, return success
							return res.status(200).json({
								status: 200,
								success: true,
								userID: session.userID
							});
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
