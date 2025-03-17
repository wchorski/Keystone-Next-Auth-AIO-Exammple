import React from "react"
import "../styles/globals.css"
import "../styles/animations.css"

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
			<body>{children}</body>
		</html>
	)
}
