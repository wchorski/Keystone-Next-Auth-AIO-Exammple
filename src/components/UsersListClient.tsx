"use client"

import { Suspense, use } from "react"
import { useFetchGraphQL, gql } from "../useFetchGraphql"

interface Data {
	users: {
		id: string
		name: string
		email: string
	}[]
}

interface Variables {}

// Runs once and caches the Promise
//! causes hydration errors in client components
// const dataPromise = fetchData()

export function UsersListClient() {
	const { data, loading, error } = useFetchGraphQL(
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
	if (loading) return <Loading />
	if (error) return <p>error</p>
	if (!data.users || data.users.length === 0) return <NoData />

	// return <pre>{JSON.stringify(data, null, 2)}</pre>
	return <Users users={data.users} />
}

const Loading = () => <p>Loading...</p>
const NoData = () => <p>No users found</p>

function Users({ users }: Data) {
	return (
		<ol>
			{users.map((u) => (
				<li key={u.id}>
					<span title={u.id}>{u.name}</span>
					<br />
					<span>{u.email}</span>
					<hr />
				</li>
			))}
		</ol>
	)
}
