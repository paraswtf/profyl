import bcrypt from "bcrypt";

export default function hash(password: string) {
	return bcrypt.hashSync(password, 10);
}

export function compare(password: string, hash: string) {
	return bcrypt.compareSync(password, hash);
}
