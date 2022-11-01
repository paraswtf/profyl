import mail from "@sendgrid/mail";
import env from "./env";

mail.setApiKey(env.MAIL_API_KEY);

export default function sendVerificationMail(email: string, verificationCode: string) {
	mail.send({
		from: "short@styxo.codes",
		to: email,
		subject: `Verify your account!`,
		html: `Hello,<br> Please Click on the link to verify your email.<br><a href="${env.BASE_URL}/api/sessions/verify?code=${verificationCode}">Click here to verify</a>`
	}).catch(console.error);
}
