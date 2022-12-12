import { AnyObjectSchema, ValidationError } from "yup";
import { ApiPathList } from "../api";

const getErrorMessages = ({ path, message, inner }: ValidationError & { path: string }) => {
	if (inner && inner.length) {
		return inner.reduce((acc: any, { path, message }) => {
			acc[path!] = message;
			return acc;
		}, {});
	}
	return { [path]: message };
};

export default function getValidObject<T extends ApiPathList[keyof ApiPathList]["request"]>(data: T, schema: AnyObjectSchema): (T & { error: undefined }) | ({ error: true } & { [K in keyof T]?: string }) {
	try {
		return schema.cast(schema.validateSync(data));
	} catch (e: any) {
		return { error: true, ...getErrorMessages(e) };
	}
}
