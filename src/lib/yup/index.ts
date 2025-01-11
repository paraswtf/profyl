//Extend yup with ObjectId validation
import { string } from "yup";
import { ObjectId } from "bson";

export const objectId = () =>
	string()
		.required()
		.test({
			name: "isObjectId",
			message: "${path} is not a valid id",
			test: (value) => {
				return ObjectId.isValid(value);
			}
		});
