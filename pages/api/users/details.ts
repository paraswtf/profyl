import { Session } from "../../../lib/models/Session";
import connect from "../../../lib/mongoose";
import { User } from "../../../lib/models/User";
import { getCookie, setCookie } from "../../../lib/cookies";
import { Request, Response, notAllowed, internalError } from "../../../lib/api";

export default async function login(req: Request<"/users/details">, res: Response<"/users/details">) {
	try {
		switch (req.method) {
			case "GET":
				//Get the session token
				const token = getCookie(req, "session");
				if (!token)
					return res.status(401).json({
						success: false,
						status: 401,
						name: "UNAUTHORIZED",
						message: "User not logged in."
					});

				await connect();

				//Find the code document and delete it
				return Session.findOne({ token }).then(async (session) => {
					if (!session)
						return res.status(401).json({
							success: false,
							status: 401,
							name: "UNAUTHORIZED",
							message: "User not logged in."
						});

					//Find the user
					return User.findById(session.userId).then((user) => {
						if (!user)
							return res.status(401).json({
								success: false,
								status: 401,
								name: "UNAUTHORIZED",
								message: "User not logged in."
							});
						return res.status(200).json({
							success: true,
							status: 200,
							username: user.username
						});
					});
				});
			default:
				return notAllowed(req, res);
		}
	} catch (err) {
		return internalError(err, res);
	}
}
