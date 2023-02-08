import { Schema, model, models, Model } from "mongoose";

const URLSchema = new Schema({
	userID: {
		type: Schema.Types.ObjectId,
		ref: "User",
		default: null
	},
	slug: {
		type: String,
		required: true,
		unique: true
	},
	url: {
		type: String,
		required: true
	},
	password: {
		type: String,
		//Password must be a valid hash
		match: /^\$2[ab]\$\d+\$[a-zA-Z0-9/\.]{53}$/,
		default: null
	}
});

export const URL = (models.URL as Model<URLData>) || model<URLData>("URL", URLSchema);

export interface URLData {
	userID: string | null;
	slug: string;
	url: string;
	password: string | null;
}
