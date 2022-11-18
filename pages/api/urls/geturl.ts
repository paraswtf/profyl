import type { NextApiRequest, NextApiResponse } from "next";
import { object, string } from "yup";
import { compare } from "../../../lib/hash";
import { URL } from "../../../lib/models/URL";
import connect from "../../../lib/mongoose";
import validate from "../../../lib/requestValidation/validate";
import APIError from "../../../lib/utils/APIError";

const schema = object().shape({
	slug: string().required(),
	password: string()
		.min(8)
		.matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])^.+$/)
		.default(undefined)
});

export default async function geturl(req: NextApiRequest, res: NextApiResponse<any>) {
	switch (req.method) {
		case "POST":
			const d = validate(req.body, schema);
			if (d instanceof APIError) return APIError.badRequest(req, res, d);

			await connect();
			return URL.findOne({ slug: d.slug })
				.then((url) => {
					if (!url) return res.status(404).json(new APIError({ status: 404, name: "NOT_FOUND", message: "This URL does not exist." }));
					if (url.password) {
						if (!d.password) return res.status(401).json(new APIError({ status: 401, name: "UNAUTHORIZED", message: "This URL is password protected." }));
						if (!compare(d.password, url.password)) return res.status(401).json(new APIError({ status: 401, name: "UNAUTHORIZED", message: "Incorrect password." }));
					}
					return res.status(200).json({ success: true, url: url.url });
				})
				.catch(() => APIError.internalError(req, res));
			break;
		default:
			APIError.notAllowed(req, res);
	}
}
