import { Schema, model, models, Model } from "mongoose";

const MFASchema = new Schema({
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
		expires: 60 * 5 // 5 minutes
	},
	sessionID: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "Session"
	},
	code: {
		type: String,
		length: 6,
		required: true,
		unique: true
	}
});

export const MFA = (models.MFA as Model<MFAData>) || model<MFAData>("MFA", MFASchema);

export interface MFAData {
	createdAt: Date;
	sessionID: string;
	code: string;
}
