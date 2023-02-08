import { object, string } from "yup";
import validateSchema from "../../../lib/requestValidation/validate";
import { User } from "../../../lib/models/User";
import connect from "../../../lib/mongoose";
import { Request, Response, internalError, notAllowed, ApiUsersValidateRequest, ValidationError } from "../../../lib/api";
import { usernameRegex } from "../../../lib/utils/common";

const schema = object({
	username: string().required().min(3).max(24).matches(usernameRegex, "Username can only contain letters, numbers, underscores and periods. It cannot start or end with a period or underscore."),
	email: string().lowercase().required().email()
}).noUnknown();

export interface SuccessResponse {
	username: string;
	email: string;
}

export default async function validate(req: Request<"/users/validate">, res: Response<"/users/validate">) {
	try {
		switch (req.method) {
			case "POST":
				const d = validateSchema(req.body, schema);
				if (d.error)
					return res.status(400).json({
						success: false,
						status: 400,
						name: "INVALID_DATA",
						message: "Invalid json in request.",
						fields: d
					});

				const err = await checkDuplicates(d.username, d.email);

				if (err)
					return res.status(400).json({
						success: false,
						status: 400,
						name: "INVALID_DATA",
						message: `User with ${err.email ? "email" : "username"} already exists.`,
						fields: err
					});

				return res.status(200).json({ status: 200, success: true });
			default:
				return notAllowed(req, res);
		}
	} catch (err) {
		return internalError(err, res);
	}
}

export async function checkDuplicates(username: string, email: string): Promise<ValidationError<ApiUsersValidateRequest>["fields"] | null> {
	await connect();
	const d = {
		email: !!(await User.exists({ email })) ? "Email already exists." : undefined,
		username: !!(await User.exists({ username })) ? "Username already exists." : undefined
	};
	if (!d.email && !d.username) return null;
	else return d;
}
