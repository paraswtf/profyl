import { connect as c } from "mongoose";

export default async function connect() {
	return c(process.env.MONGODB_URI);
}
