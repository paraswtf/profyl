import axios from "axios";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { MFA } from "./models/MFA";
import { Session } from "./models/Session";
import connect from "./mongoose";
import { generateCode } from "./uniqueID";

export async function generateSession(userID: Types.ObjectId, mfaEnabled?: boolean, emailVerified?: boolean, ip?: string, userAgent?: string): Promise<{ token: string } & ({ code?: undefined; verificationToken?: undefined } | { code: string; verificationToken: string })> {
	await connect();
	const sessionID = new Types.ObjectId();
	const token = jwt.sign({ userID, sessionID }, process.env.JWT_SECRET, { expiresIn: "7d" });

	const location = ip ? await axios.get(`https://geolocation-db.com/json/${ip}`).catch(() => {}) : undefined;

	const session = await Session.create({
		_id: sessionID,
		token,
		userID: userID,
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

	if (mfaEnabled || !emailVerified) {
		const verificationToken = jwt.sign({ sessionID: session.id }, process.env.JWT_SECRET, { expiresIn: "5m" });
		const { code } = await MFA.create({
			sessionID: session._id,
			code: generateCode(),
			createdAt: new Date()
		});
		return { token, code, verificationToken };
	}

	return { token };
}
