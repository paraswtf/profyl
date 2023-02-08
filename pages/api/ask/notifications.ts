import { object, string } from "yup";
import { getCookie } from "../../../lib/cookies";
import connect from "../../../lib/mongoose";
import validate from "../../../lib/requestValidation/validate";
import { generateKey } from "../../../lib/uniqueID";
import { internalError, notAllowed, Request, Response } from "../../../lib/api";
import { getDatabaseUser } from "../../../lib/utils";
import { Notifications } from "../../../lib/models/ask/Notifications";

const postschema = object({
	key: string().required(),
	message: string().required()
});

const patchschema = object({
	key: string().required(),
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
				const d = validate(req.body as { key: string; message: string }, postschema);
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
				const key = generateKey();
				return Notifications.updateOne(
					{
						key: d.key
					},
					{
						notifications: {
							$push: {
								key,
								message: d.message
							}
						}
					}
				).then((doc) => {
					if (!doc.modifiedCount)
						return res.status(400).json({
							success: false,
							status: 400,
							name: "INVALID_DATA",
							message: "The key is invalid.",
							fields: {
								key: d.key
							}
						});
					res.status(200).json({ status: 200, success: true, updateKey: key });
				});
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
						"key": data.key,
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
							message: "Either the key or updateKey is invalid.",
							fields: {
								key: data.key,
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
