import { object, string } from "yup";
import { getCookie } from "../../../lib/cookies";
import connect from "../../../lib/mongoose";
import validate from "../../../lib/requestValidation/validate";
import { generateKey } from "../../../lib/uniqueID";
import request, { internalError, notAllowed, Request, Response } from "../../../lib/api";
import { getDatabaseUser } from "../../../lib/utils";
import { Notifications } from "../../../lib/models/ask/Notifications";
import { URL } from "../../../lib/models/URL";

const postschema = object({
	slug: string().required(),
	message: string().required()
});

const patchschema = object({
	updateKey: string().required(),
	message: string().required()
});

export default async function generate(req: Request<"/ask/notifications">, res: Response<"/ask/notifications">) {
	try {
		switch (req.method) {
			case "GET":
				const token = getCookie(req, "session");
				const user = token ? await getDatabaseUser(token) : null;

				//Check if user is logged in if they want to view notifications
				if (!token || !user)
					return res.status(400).json({
						success: false,
						status: 401,
						name: "LOGIN_REQUIRED",
						message: "You must be logged in to use custom slugs."
					});

				//Make sure the database is connected
				await connect();
				return Notifications.findOne({
					userID: user._id
				}).then((d) => {
					if (!d) return res.status(200).json({ status: 200, success: true, notifications: [] });
					res.status(200).json({ status: 200, success: true, notifications: d.notifications });
				});
			case "POST":
				const d = validate(req.body as { slug: string; message: string }, postschema);
				if (d.error)
					return res.status(400).json({
						success: false,
						status: 400,
						name: "INVALID_DATA",
						message: "Invalid json in request.",
						fields: d
					});

				//Make sure the database is connected
				await connect();

				//Find the user
				const userID = await URL.findOne({ slug: d.slug }).then((d) => d?.userID);
				if (!userID)
					return res.status(400).json({
						success: false,
						status: 400,
						name: "INVALID_DATA",
						message: "Invalid slug.",
						fields: {
							slug: d.slug
						}
					});

				const key = generateKey();
				return Notifications.updateOne(
					{
						userID
					},
					{
						notifications: {
							$push: {
								key,
								message: d.message
							}
						}
					}
				).then(() => res.status(200).json({ status: 200, success: true, updateKey: key }));
			case "PATCH":
				const data = validate(req.body as { key: string; updateKey: string; message: string }, patchschema);
				if (data.error)
					return res.status(400).json({
						success: false,
						status: 400,
						name: "INVALID_DATA",
						message: "Invalid json in request.",
						fields: data
					});

				//Make sure the database is connected
				await connect();
				return Notifications.updateOne(
					{
						"notifications.key": data.updateKey
					},
					{
						"notifications.$.message": data.message
					}
				).then((d) => {
					if (!d.modifiedCount)
						return res.status(400).json({
							success: false,
							status: 400,
							name: "INVALID_DATA",
							message: "The updateKey is invalid.",
							fields: {
								updateKey: data.updateKey
							}
						});
					res.status(200).json({ status: 200, success: true });
				});
			default:
				return notAllowed(req, res);
		}
	} catch (err) {
		internalError(err, res);
	}
}
