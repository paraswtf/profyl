import mail from "@sendgrid/mail";
import env from "./env";

mail.setApiKey(env.MAIL_API_KEY);

export default async function sendVerificationMail(email: string, verificationCode: string, verificationToken: string) {
	await mail
		.send({
			from: "short@styxo.codes",
			to: email,
			subject: `Verify your account!`,
			html: `Hello,<br> Please Click on the link or use the code <b>${verificationCode}</b> to verify your email.<br><a href="${env.BASE_URL}/verify?token=${verificationToken}">Click here to verify</a>`
		})
		.catch(console.error);
}
