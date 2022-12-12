import jwt from "jsonwebtoken";
import env from "../env";
import { Session } from "../models/Session";
import { User } from "../models/User";
import connect from "../mongoose";

export function obfuscateMail(email: string) {
	const [first, second] = email.split("@");
	return `${first.slice(0, 2)}...${first.slice(-2)}@${second}`;
}

export async function getDatabaseUser(token: string) {
	try {
		jwt.verify(token, env.JWT_SECRET);

		await connect();

		return Session.findOne({ token }).then((session) => {
			if (!session || !session.verified) return null;
			return User.findById(session.userId).then((user) => {
				if (!user) return null;
				return user;
			});
		});
	} catch {
		return null;
	}
}
