import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"
import { DialogPopup } from "@components/DialogPopup"
import { LoginForm } from "@components/LoginForm"
import { PasswordRequestForm } from "@components/PasswordRequestForm"
import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { getProviders } from "next-auth/react"
import Link from "next/link"

const { SITE_TITLE } = envs

export const metadata: Metadata = {
	title: "Login | " + SITE_TITLE,
	description: "Login, register, or recover account",
}

type Props = {
	searchParams: {
		reset: string
		error: string
		callbackUrl?: string
	}
}

export default async function LoginPage({ searchParams }: Props) {
	const { error, callbackUrl } = await searchParams
	// todo next-auth is aight idk

	const session = await getServerSession(nextAuthOptions)
	const providers = await getProviders()

	return (
		<main>
			<DialogPopup buttonLabel="">
				<p> Forgot your password? </p>
				<PasswordRequestForm />
			</DialogPopup>

			<header>
				<h1> Login </h1>
				{callbackUrl && (
					<div className={"warning"}>
						<p>You will return back to the previous page after login</p>
					</div>
				)}
			</header>
			<div>
				<div>
					<div>
						<LoginForm providers={providers} callbackUrl={callbackUrl} />
					</div>

					<div>
						{session?.user?.email && (
							<div className={"info"}>
								<p>
									currently logged in with email{" "}
									<strong>{session.user.email}</strong>. Go to your{" "}
									<Link href={`/`}>Account</Link>
								</p>
							</div>
						)}

						{error && (
							<div className={"error"}>
								<p> Login failed. Please try again </p>
							</div>
						)}
						<h4> Create a New Account </h4>
						<p>
							<Link href={`/register`} className={"button  large"}>
								Register Now
							</Link>
						</p>
					</div>
				</div>
			</div>
		</main>
	)
}
