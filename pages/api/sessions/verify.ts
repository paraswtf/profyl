import type { NextApiRequest, NextApiResponse } from "next";
import { MFA } from "../../../lib/models/MFA";
import { Session } from "../../../lib/models/Session";
import connect from "../../../lib/mongoose";
import APIError from "../../../lib/utils/APIError";
import { object, string } from "yup";
import validate from "../../../lib/requestValidation/validate";
import { User } from "../../../lib/models/User";

const schema = object()
	.shape({
		code: string().required().length(6).matches(/^\d+$/)
	})
	.noUnknown();

export default async function verify(req: NextApiRequest, res: NextApiResponse<any>) {
	switch (req.method) {
		case "POST":
			const d = validate(req.body, schema);
			if (d instanceof APIError) return APIError.badRequest(req, res, d);

			await connect();

			//Find the code document and delete it
			MFA.findOneAndDelete({ code: d.code })
				.then((mfa) => {
					//If the code is not found, invalid code
					if (!mfa) return APIError.badRequest(req, res, new APIError({ status: 400, message: "Invalid code.", name: "INVALID_CODE" }));

					//Find the session and update it
					Session.findByIdAndUpdate({ _id: mfa.sessionID }, { verified: true, emailVerified: true })
						.then((session) => {
							//If the session is not found, invalid code
							if (!session) return APIError.badRequest(req, res, new APIError({ status: 400, message: "Invalid code.", name: "INVALID_CODE" }));

							//Set the user to verifiedEmail in case it isnt already
							if (!session.emailVerified) User.findByIdAndUpdate({ _id: session.userId }, { emailVerified: true });

							//If the session was found, return success
							res.status(200).json({ success: true });
						})
						.catch((err) => APIError.internalError(req, res));
				})
				.catch((err) => APIError.internalError(req, res));
			break;
		default:
			APIError.notAllowed(req, res);
	}
}
