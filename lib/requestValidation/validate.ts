import { AnyObjectSchema } from "yup";
import APIError from "../utils/APIError";

export default function getValidObject<T>(data: T, schema: AnyObjectSchema): T | APIError {
	try {
		return schema.cast(schema.validateSync(data));
	} catch (e: any) {
		return new APIError({ status: 400, message: "Your JSON does not pass validation :/", name: "BAD_REQUEST" });
	}
}
