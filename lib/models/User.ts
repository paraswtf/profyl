import { Schema, model, models, Model } from "mongoose";

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		//Username length must be between 3 and 24 characters
		minlength: 3,
		maxlength: 24,
		//Username must not begin and end with a . or a _
		//Username cannot contain consequetive . or _
		//Username can contain only alphanumeric characters, . and _
		match: /(?!^[\.\_])(?![\.\_]$)(?!.*[\.\_]{2,})^[a-zA-Z0-9\.\_]+$/
	},
	password: {
		type: String,
		required: true,
		//Password must be a valid hash
		match: /^\$2[ab]\$\d+\$[a-zA-Z0-9/\.]{53}$/
	},
	email: {
		type: String,
		required: true,
		unique: true,
		//Email must be a valid RFC2822 email address
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
	},
	emailVerified: {
		type: Boolean,
		default: false
	},
	emailSubscription: {
		type: Boolean,
		default: false
	},
	mfaEnabled: {
		type: Boolean,
		default: true
	}
});

export const User = (models.User as Model<UserData>) || model<UserData>("User", UserSchema);

export interface UserData {
	username: string;
	password: string;
	email: string;
	emailVerified: boolean;
	emailSubscription: boolean;
	mfaEnabled: boolean;
}
