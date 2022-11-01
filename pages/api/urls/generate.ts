import Cookies from "js-cookie";
import type { NextApiRequest, NextApiResponse } from "next";
import { boolean, object, string } from "yup";
import hash from "../../../lib/hash";
import { Session } from "../../../lib/models/Session";
import { URL } from "../../../lib/models/URL";
import { User } from "../../../lib/models/User";
import connect from "../../../lib/mongoose";
import validate from "../../../lib/requestValidation/validate";
import { generateSlug } from "../../../lib/uniqueID";
import APIError from "../../../lib/utils/APIError";
import { checkIfExisting } from "./validate";

const schema = object().shape({
	url: string().required().url(),
	password: string()
		.min(8)
		.matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])^.+$/)
		.default(undefined),
	prependUsername: boolean().default(false),
	slug: string()
		.matches(/(?!^[\.\_])(?![\.\_]$)(?!.*[\.\_]{2,})^[a-zA-Z0-9\.\_]+$/)
		.default(undefined)
});

export default async function generate(req: NextApiRequest, res: NextApiResponse<any>) {
	switch (req.method) {
		case "POST":
			const d = validate(req.body, schema);
			if (d instanceof APIError) return APIError.badRequest(req, res, d);

			//Hash the password if it exists
			if (d.password) d.password = hash(d.password);

			const token = Cookies.get("session");
			//Connect to db
			await connect();
			const user = await Session.findOne({ token })
				.then((session) => (session ? User.findById(session.userId).catch(() => null) : null))
				.catch(() => null);

			if (!user && (d.prependUsername || d.slug)) return res.status(401).json(new APIError({ status: 401, name: "UNAUTHORIZED", message: "You must be logged in to use this feature." }));

			const slug = d.slug ?? generateSlug();
			const finalSlug = user && d.prependUsername ? `${user.username}/${slug}` : slug;

			//Check if already exists
			if (await checkIfExisting(finalSlug)) return res.status(409).json(new APIError({ status: 409, name: "CONFLICT", message: "This slug is already taken." }));

			return URL.create({
				slug: finalSlug,
				url: d.url,
				password: d.password,
				userId: user?._id ?? null
			})
				.then(() => res.status(200).json({ success: true, slug: finalSlug }))
				.catch(() => APIError.internalError(req, res));
			break;
		default:
			APIError.notAllowed(req, res);
	}
}
