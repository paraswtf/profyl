import type { NextApiRequest, NextApiResponse } from "next";
import { ApiPingErrorResponse, ApiPingResponse } from "../../lib/api";

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiPingResponse | ApiPingErrorResponse>) {
	res.status(200).json({ success: true, status: 200, message: "Pong!" });
}
