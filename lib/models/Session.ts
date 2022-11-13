import { Schema, model, models, Model } from "mongoose";

const SessionSchema = new Schema({
	token: {
		type: String,
		required: true,
		unique: true
	},
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "User"
	},
	location: {
		userAgent: String,
		ip: String,
		countryCode: String,
		countryName: String,
		city: String,
		state: String,
		postalCode: String,
		latitude: String,
		longitude: String
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
		expires: 60 * 60 * 24 * 7 // 7 days
	},
	verified: {
		type: Boolean,
		default: false
	},
	emailVerified: {
		type: Boolean,
		default: false
	}
});

export const Session = (models.Session as Model<SessionData>) || model<SessionData>("Session", SessionSchema);

export interface SessionData {
	token: string;
	userId: string;
	location: {
		userAgent: string;
		ip: string;
		countryCode: string;
		countryName: string;
		city: string;
		state: string;
		postalCode: string;
		latitude: string;
		longitude: string;
	};
	createdAt: Date;
	vefified: boolean;
	emailVerified: boolean;
}
