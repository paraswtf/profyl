import { createTransport } from "nodemailer";
import env from "./env";

const transporter = createTransport({
	host: "mail.smtp2go.com",
	port: 443,
	secure: true,
	auth: {
		user: "shortu",
		pass: "VsaO6ipwEMdR8YTM"
	}
});

export default function sendVerificationMail(email: string, verificationCode: string) {
	return transporter.sendMail({
		from: "short@styxo.codes",
		to: email,
		subject: `Verify your account!`,
		html: `Hello,<br> Please Click on the link to verify your email.<br><a href="${env.BASE_URL}/api/sessions/verify?code=${verificationCode}">Click here to verify</a>`
	});
}
