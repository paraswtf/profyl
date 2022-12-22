import mail from "@sendgrid/mail";

mail.setApiKey(process.env.MAIL_API_KEY);

export default async function sendVerificationMail(email: string, verificationCode: string, verificationToken: string) {
	await mail
		.send({
			to: email,
			from: process.env.MAIL_USERNAME,
			subject: `Verify your account!`,
			html: `Hello,<br> Please Click on the link or use the code <b>${verificationCode}</b> to verify your email.<br><a href="https://${process.env.HOSTNAME}/verify?token=${verificationToken}">Click here to verify</a>`
		})
		.catch(console.error);
}
