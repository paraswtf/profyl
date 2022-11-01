import { connect as c } from "mongoose";
import env from "../lib/env";

export default async function connect() {
	return c(env.MONGODB_URI);
}
