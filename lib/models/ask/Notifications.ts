import { Schema, model, models, Model } from "mongoose";

const NotificationsSchema = new Schema({
	userID: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "User"
	},
	notifications: {
		type: Array,
		of: {
			key: String,
			message: String
		},
		default: []
	}
});

export const Notifications = (models.Notifications as Model<NotificationsData>) || model<NotificationsData>("Notifications", NotificationsSchema);

export interface NotificationsData {
	userID: string;
	notifications: Notification[];
}

export interface Notification {
	key: string;
	message: string;
}
