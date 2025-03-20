import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"
import { DialogPopup } from "@components/menus/DialogPopup"
import { LoginForm } from "@components/LoginForm"
import { PasswordRequestForm } from "@components/PasswordRequestForm"
import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { getProviders } from "next-auth/react"
import Link from "next/link"
// import {
// 	layout_full,
// 	layout_site,
// 	layout_wide,
// 	page_content,
// 	page_layout,
// } from "@styles/layout.module.css"

export const metadata: Metadata = {
	title: "Login | " + envs.SITE_TITLE,
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
		<main
		// className={page_layout}
		>
			<DialogPopup buttonLabel="">
				<p> Forgot your password? </p>
				<PasswordRequestForm />
			</DialogPopup>

			<header>
				<h1> Login </h1>
				{callbackUrl && (
					<div className={"warn"}>
						<p>You will return back to the previous page after login</p>
					</div>
				)}
			</header>
			<div
			// className={[page_content, layout_wide].join(" ")}
			>
				<div className={"flex"}>
					<div>
						<LoginForm providers={providers} callbackUrl={callbackUrl} />
					</div>

					<div>
						{session?.user.email && (
							<div className={"info"}>
								<p>
									{" "}
									currently logged in with email{" "}
									<strong> {session.user.email} </strong>. Go to your{" "}
									<Link href={`/`}> Account </Link>
								</p>
							</div>
						)}

						{error && (
							<div className={"error"}>
								{" "}
								<p> Login failed. Please try again </p>
							</div>
						)}
						<h4> Create a New Account </h4>
						<p>
							<Link href={`/register`} className={"button  large"}>
								{" "}
								Register Now{" "}
							</Link>
						</p>
					</div>
				</div>
			</div>
		</main>
	)
}
