import React from "react"
import "../styles/globals.css"
import "../styles/animations.css"
import { ApolloWrapper } from "./ApolloWrapper"
import { CookieProvider } from "./CookieContext"
import getCookie from "./actions/getCookie"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html>
			<head>
				<title>Next.js + Keystone</title>
				<meta
					name="description"
					content="Example to use Keystone APIs in a Next.js server environment."
				/>
				<link rel="icon" href="/favicon.ico" />
			</head>
			<body>
				{/* <CookieProvider cookie={getCookie()}>
					<ApolloWrapper> */}
						<main>{children}</main>
					{/* </ApolloWrapper>
				</CookieProvider> */}
			</body>
		</html>
	)
}
