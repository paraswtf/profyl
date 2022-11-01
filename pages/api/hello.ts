import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../lib/models/User";
import connect from "../../lib/mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	switch (req.method) {
		case "GET":
		case "POST":
	}
	await connect();
	res.status(200).json(await User.create({ username: "test", password: "Paras@1.", email: "paras@styxo.codes" }));
}
