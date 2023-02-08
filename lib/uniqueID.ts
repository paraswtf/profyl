import ShortUniqueID from "short-unique-id";
const code = new ShortUniqueID({ length: 6, dictionary: "number" });
const slug = new ShortUniqueID({ length: 7 });
const key = new ShortUniqueID({ length: 32 });

export function generateCode() {
	return code();
}

export function generateSlug() {
	return slug();
}

export function generateKey() {
	return key();
}
