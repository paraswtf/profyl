import ShortUniqueID from "short-unique-id";
const code = new ShortUniqueID({ length: 6, dictionary: "number" });
const slug = new ShortUniqueID({ length: 7 });

export function generateCode() {
	return code();
}

export function generateSlug() {
	return slug();
}
