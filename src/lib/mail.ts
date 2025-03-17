import { createTransport, getTestMessageUrl } from "nodemailer"
import { envs } from "../../envs"
// import PasswordResetEmail from "../emails/passwordReset"
// import PasswordResetConfirmEmail from "../emails/passwordResetConfirm"
import { userVeryHtml } from "../mail/userVerifyHtml"
import { User } from "../keystone/types"
import { passwordResetEmail } from "../mail/passwordResetEmail"
import { passwordResetConfirmMail } from "../mail/passwordResetConfirm"

const {
	MAIL_HOST,
	MAIL_PORT,
	MAIL_USER,
	MAIL_PASS,
	SITE_TITLE,
	ADMIN_EMAIL_ADDRESS,
} = envs

const FRONTEND_URL = envs.FRONTEND_URL

const transport = createTransport({
	service: "gmail",
	...(MAIL_HOST ? { host: MAIL_HOST } : {}),
	...(MAIL_PORT ? { host: MAIL_PORT } : {}),
	auth: {
		user: MAIL_USER,
		pass: MAIL_PASS,
	},
})

function makeANiceEmail(text: string): string {
	return `
    <div className="email" style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Hello,</h2>
      <p>${text}</p>

      <p>- ${SITE_TITLE}</p>
    </div>
  `
}

type PasswordRequest = {
	to: string[]
	resetToken: string
	user: User
}
export async function mailPasswordRequest({
	to,
	resetToken,
	user,
}: PasswordRequest): Promise<void> {
	// email the user a token

	const resetLink =
		envs.FRONTEND_URL +
		`/password-reset?email=${user.email}&token=${resetToken}`

	// const html = render(
	// 	PasswordResetEmail({ user, updatedDate: new Date(), resetToken, resetLink })
	// )
	const info = await transport
		.sendMail({
			to,
			from: ADMIN_EMAIL_ADDRESS,
			subject: "Password Reset Requested",
			html: passwordResetEmail(user, resetLink),
		})
		.catch((err) => {
			console.log("!!! mailPasswordReset ERROR: ", err)
			throw new Error("mail smpt error: " + err.message)
		})

	if (MAIL_USER?.includes("ethereal.email") && info) {
		console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(info)}`)
	}
}

type UserVerify = {
	to: string[]
	token: string
	user: User
}
export async function mailVerifyUser({
	to,
	user,
	token,
}: UserVerify): Promise<void> {
	// email the user a token

	// const html = render(
	// 	UserVerifyEmail({ user, updatedDate: new Date(), verifyLink })
	// )
	const info = await transport
		.sendMail({
			to,
			from: ADMIN_EMAIL_ADDRESS,
			subject: "New Account Registered",
			html: userVeryHtml(user, token),
		})
		.catch((err) => {
			console.log("!!! mailVerifyUser ERROR: ", err)
			throw new Error("!!! mailVerifyUser: " + err.message)
		})
	// const info = await transport
	// 	.sendMail({
	// 		to,
	// 		from: ADMIN_EMAIL_ADDRESS,
	// 		subject: "New Account Registered",
	// 		html,
	// 	})
	// 	.catch((err) => {
	// 		console.log("!!! mailVerifyUser ERROR: ", err)
	// 		throw new Error("!!! mailVerifyUser: " + err.message)
	// 	})

	if (MAIL_USER?.includes("ethereal.email") && info) {
		console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(info)}`)
	}
}

type PasswordResetConfirm = {
	to: string[]
	user: {
		email: string
		name?: string
		id: string
	}
}
export async function mailPasswordResetConfirm({
	to,
	user,
}: PasswordResetConfirm): Promise<void> {
	// email the user a token

	// const html = render(
	// 	PasswordResetConfirmEmail({ user, updatedDate: new Date() })
	// )
	const info = await transport
		.sendMail({
			to,
			from: ADMIN_EMAIL_ADDRESS,
			subject: "Password Reset Confirmed",
			html: passwordResetConfirmMail(FRONTEND_URL),
		})
		.catch((err) => {
			console.log("!!! mailPasswordResetConfirm ERROR: ", err)
			throw new Error("mail smpt error: " + err.message)
		})

	if (MAIL_USER?.includes("ethereal.email") && info) {
		console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(info)}`)
	}
}
