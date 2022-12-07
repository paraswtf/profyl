import { NextApiRequest } from "next";
import { serialize } from "cookie";

export function getCookie(req: NextApiRequest, name: string) {
	const cookies = req.cookies;
	return cookies[name];
}

export function setCookie(res: any, name: string, value: string) {
	res.setHeader("Set-Cookie", serialize(name, value, { path: "/", expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), secure: true, sameSite: "strict" }));
}

export function deleteCookie(res: any, name: string) {
	res.setHeader("Set-Cookie", serialize(name, "", { path: "/", expires: new Date(0), secure: true, sameSite: "strict" }));
}
