import { object, string } from "yup";
import { getCookie } from "../../../lib/cookies";
import hash from "../../../lib/hash";
import { Session } from "../../../lib/models/Session";
import { URL } from "../../../lib/models/URL";
import { User } from "../../../lib/models/User";
import connect from "../../../lib/mongoose";
import validate from "../../../lib/requestValidation/validate";
import { generateSlug } from "../../../lib/uniqueID";
import { checkIfExisting } from "./validate";
import { internalError, notAllowed, Request, Response } from "../../../lib/api";
import { getDatabaseUser } from "../../../lib/utils";

const schema = object({
	url: string().required().url(),
	password: string().min(1).default(undefined),
	slug: string()
		.matches(/(?!^[\.\_])(?![\.\_]$)(?!.*[\.\_]{2,})^[a-zA-Z0-9\.\_]+$/)
		.default(undefined)
});

export default async function generate(req: Request<"/urls/generate">, res: Response<"/urls/generate">) {
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

				//Hash the password if it exists
				if (d.password) d.password = hash(d.password);

				const token = getCookie(req, "session");
				const user = token ? await getDatabaseUser(token) : null;

				//Check if user is logged in if they want to use a custom slug
				if (d.slug && (!token || !user))
					return res.status(400).json({
						success: false,
						status: 400,
						name: "INVALID_DATA",
						message: "You must be logged in to use custom slugs.",
						fields: {
							slug: "You must be logged in to use custom slugs."
						}
					});

				const slug = d.slug ?? generateSlug();

				//Check if already exists
				if (await checkIfExisting(slug))
					return res.status(400).json({
						success: false,
						status: 400,
						name: "INVALID_DATA",
						message: "Slug already exists",
						fields: {
							slug: "Slug already exists"
						}
					});

				//Make sure the database is connected
				await connect();
				return URL.create({
					slug,
					url: d.url,
					password: d.password,
					userId: user?._id ?? null
				}).then(() => res.status(200).json({ status: 200, success: true, slug }));
			default:
				return notAllowed(req, res);
		}
	} catch (err) {
		internalError(err, res);
	}
}
