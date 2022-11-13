import axios from "axios";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import env from "./env";
import { MFA } from "./models/MFA";
import { Session } from "./models/Session";
import connect from "./mongoose";
import { generateCode } from "./uniqueID";

export async function generateSession(userID: Types.ObjectId, mfaEnabled?: boolean, emailVerified?: boolean, ip?: string, userAgent?: string) {
	await connect();
	const token = jwt.sign({ userID }, env.JWT_SECRET, { expiresIn: "7d" });

	const location = ip ? await axios.get(`https://geolocation-db.com/json/${ip}`).catch(() => {}) : undefined;

	const session = await Session.create({
		token,
		userId: userID,
		location: {
			userAgent,
			ip,
			countryCode: location?.data.country_code,
			countryName: location?.data.country_name,
			city: location?.data.city,
			state: location?.data.state,
			postalCode: location?.data.postal,
			latitude: location?.data.latitude,
			longitude: location?.data.longitude
		},
		createdAt: new Date(),
		verified: !mfaEnabled
	});

	if (mfaEnabled) {
		const { code } = await MFA.create({
			sessionID: session._id,
			code: generateCode(),
			createdAt: new Date()
		});
		return { token, code };
	}

	return { token };
}
