"use client"

import { Suspense, useEffect, useState } from "react"
import { fetchGraphQL, gql } from "../graphql"

interface Data {
	users: {
		id: string
		name: string
		email: string
	}[]
}

interface Variables {}

// const client = new ApolloClient({
// 	uri: "http://localhost:3001/api/graphql",

// 	cache: new InMemoryCache(),
// })

const fetchData = () => {
  return new Promise((resolve) => setTimeout(() => (['one', 'two', 'three']), 4000))
}

export function UsersListClient() {
  const data = fetchData()
  console.log({data});
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Users />
		</Suspense>
	)
}

interface UserProps {}

function Users({}: UserProps) {
	const [users, setUsers] = useState([])

	useEffect(() => {
		const fetch = async () => {
			const data = await fetchGraphQL(
				gql`
					query Users {
						users {
							id
							name
							email
						}
					}
				`,
				{}
			)

			// console.log(data.users)
			setUsers(data.users)
		}
		fetch()
		// return () =>
	}, [])

	return (
		<ol>
			{users.length > 0 ? (
				users.map((u:any) => (
					<li key={u.id}>
						<span title={u.id}>{u.name}</span>
						<br />
						<span>{u.email}</span>
						<hr />
					</li>
				))
			) : (
				<p>no users found using client fetch</p>
			)}
		</ol>
	)
	// return (
	// 	<ol>
	// 		{users.length > 0 ? (
	// 			users.map((u:any) => (
	// 				<li key={u.id}>
	// 					<span title={u.id}>{u.name}</span>
	// 					<br />
	// 					<span>{u.email}</span>
	// 					<hr />
	// 				</li>
	// 			))
	// 		) : (
	// 			<p>no users found using client fetch</p>
	// 		)}
	// 	</ol>
	// )
}
