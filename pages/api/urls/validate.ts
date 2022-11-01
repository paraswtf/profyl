import Cookies from "js-cookie";
import type { NextApiRequest, NextApiResponse } from "next";
import { boolean, object, string } from "yup";
import { Session } from "../../../lib/models/Session";
import { User } from "../../../lib/models/User";
import validate from "../../../lib/requestValidation/validate";
import { generateSlug } from "../../../lib/uniqueID";
import APIError from "../../../lib/utils/APIError";
import { URL } from "../../../lib/models/URL";
import connect from "../../../lib/mongoose";

const schema = object().shape({
	prependUsername: boolean().default(false),
	slug: string()
		.required()
		.matches(/(?!^[\.\_])(?![\.\_]$)(?!.*[\.\_]{2,})^[a-zA-Z0-9\.\_]+$/)
});

export default async function validateURL(req: NextApiRequest, res: NextApiResponse<any>) {
	switch (req.method) {
		case "POST":
			const d = validate(req.body, schema);
			if (d instanceof APIError) return APIError.badRequest(req, res, d);

			const token = Cookies.get("session");

			//Connect to db
			await connect();

			const user = await Session.findOne({ token })
				.then((session) => (session ? User.findById(session.userId).catch(() => null) : null))
				.catch(() => null);

			if (!user) return res.status(401).json(new APIError({ status: 401, name: "UNAUTHORIZED", message: "You must be logged in to use this feature." }));

			//Check if already exists
			const finalSlug = d.prependUsername ? `${user.username}/${d.slug}` : d.slug;

			if (await checkIfExisting(finalSlug)) return res.status(409).json(new APIError({ status: 409, name: "CONFLICT", message: "This slug is already taken." }));

			res.status(200).json({ success: true });
			break;
		default:
			APIError.notAllowed(req, res);
	}
}

export async function checkIfExisting(slug: string) {
	//Connect to db
	await connect();

	return URL.exists({ slug })
		.then((url) => !!url)
		.catch(() => false);
}
