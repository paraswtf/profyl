import { getCookie, setCookie } from "../../../lib/cookies";
import { Session } from "../../../lib/models/Session";
import connect from "../../../lib/mongoose";
import { Request, Response, notAllowed, internalError } from "../../../lib/api";

export default async function logout(req: Request<"/users/logout">, res: Response<"/users/logout">) {
	try {
		switch (req.method) {
			case "POST":
				const token = getCookie(req, "session");
				if (!token) return res.status(200).json({ status: 200, success: true });
				//Delete the browser cookie
				setCookie(res, "session", "");

				await connect();
				//Find the session and delete it
				return Session.findOneAndDelete({ token }).then(() => res.status(200).json({ status: 200, success: true }));
			default:
				notAllowed(req, res);
		}
	} catch (err) {
		internalError(err, res);
	}
}
