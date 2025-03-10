"use client"

import { client } from "@lib/request"
import { gql } from "graphql-request"
import { useEffect, useState } from "react"

export function UsersListClient() {
	const [users, setUsers] = useState([])
	useEffect(() => {
		client
			.request(
				gql`
					{
						users {
							id
							name
							email
						}
					}
				`
			)
			.then((data: any) => {
				setUsers(data.users)
			})

		// return () =>
	}, [])

	return <ol>
    {users.map(u => (
      <li>{u.name} | {u.email}</li>
    ))}
  </ol>
}
