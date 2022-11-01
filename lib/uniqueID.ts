import ShortUniqueId from "short-unique-id";
const code = new ShortUniqueId({ length: 6, dictionary: "number" });
const slug = new ShortUniqueId({ length: 7 });

export function generateCode() {
	return code();
}

export function generateSlug() {
	return slug();
}
