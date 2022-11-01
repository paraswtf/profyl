import type { NextApiRequest, NextApiResponse } from "next";
import { Session } from "../../../lib/models/Session";
import connect from "../../../lib/mongoose";
import APIError from "../../../lib/utils/APIError";
import Cookie from "js-cookie";

export default async function logout(req: NextApiRequest, res: NextApiResponse<any>) {
	switch (req.method) {
		case "POST":
			const token = Cookie.get("session");
			if (!token) return APIError.badRequest(req, res, new APIError({ status: 401, message: "User not logged in.", name: "UNAUTHORIZED" }));
			//Delete the browser cookie
			Cookie.remove("session");

			await connect();
			//Find the session and delete it
			Session.findOneAndDelete({ token })
				.then(() => res.status(200).json({ success: true }))
				.catch(() => APIError.internalError(req, res));
			break;
		default:
			APIError.notAllowed(req, res);
	}
}
