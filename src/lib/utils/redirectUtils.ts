import ShortUniqueID from "short-unique-id";
const suid = new ShortUniqueID({
	dictionary: ["p", "r", "o", "f", "y", "l", "P", "R", "O", "F", "Y", "L"]
});

export function generateSlug() {
	return suid.rnd(7);
}

export function generateKey() {
	return suid.rnd(32);
}
