import React from "react"
import { DocumentRender } from "./DocumentRender"
import { fetchUsers } from "./fetch/fetchUsers"
import { envs } from "@/envs"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { nextAuthOptions } from "@/session"
import SignOutButton from "@components/SignOutButton"
import { UsersListClient } from "@components/UsersListClient"
import { UsersListClientApollo } from "@components/UsersListClientApollo"
import { query } from "@lib/gqlClient"
import { fetchGraphQL, gql } from "../graphql"
import { FakeDataComponent } from "@components/FakeDataSuspense"

const { PERPAGE } = envs
const page = 1

export default async function HomePage() {
	// WARNING: this does nothing for now
	//   you will probably use getServerSession from 'next/auth'
	//   https://next-auth.js.org/configuration/nextjs#in-app-directory
	const session = await getServerSession(nextAuthOptions)
	const { users, error } = await fetchUsers({
		query: QUERY_USERS,
		page,
		perPage: PERPAGE,
		session,
	})

	// Apollo client fetch (Server Side)
	// const { data } = await getClient().query({ query: userQuery })
	// `query` is a shortcut for `getClient().query`
	const { data } = await fetchGraphQL({
		query: gql`
			query Users {
				users {
					id
					name
					email
				}
			}
		`,
    variables: {}
	})
  console.log({data});

	if (error)
		return (
			<section>
				<p>{error.toString()}</p>
			</section>
		)

	return (
		<section>
			{session ? (
				<p>
					Logged in as {session.user?.email}
					<br />
					<Link href={`/admin`}>Admin Dashboard CMS</Link>
					<br />
					<SignOutButton />
				</p>
			) : (
				<Link href={`/login`}>Login</Link>
			)}

			<h2>Next.js 🤝 Keystone</h2>

			<FakeDataComponent />

			<section>
				<h2>Users fetch with Client Component (From Browser)</h2>
				{/* <UsersListClientApollo /> */}
				<UsersListClient />
			</section>

			<section>
				<h2>Users fetched GQL (Server Side)</h2>
        <p>credentials do not get passed. Authorization does not happen here</p>
        <pre>
         {JSON.stringify({data}, null, 2)}
        </pre>
				{/* {data?.users && data.users.length > 0 ? (
					<ol>
						{data.users.map((u: any) => (
							<li key={u.id}>
								<hr />
								<span>{u.name} </span>
								<br />
								<span>{u.email} </span>
							</li>
						))}
					</ol>
				) : (
					<p>no users found.{!session && " not authorized to see data"}</p>
				)} */}
			</section>

			<section>
				<h2>Users fetched from the server using Keystone Context</h2>
				{users && users.length > 0 ? (
					<ol>
						{users.map((u) => (
							<li key={u.id}>
								<hr />
								<span>{u.name} </span>
								<br />
								<span>{u.email} </span>
								{/* {u.about && (
                  <>
                    
                    <DocumentRender document={u.about?.document} />
                  </>
                )} */}
							</li>
						))}
					</ol>
				) : (
					<p>no users found.{!session && " not authorized to see data"}</p>
				)}
			</section>

			<hr />

			<h2>How does it work?</h2>

			<p>
				Keystone's APIs can be seamlessly composed to work as a powerful data
				engine within Next.js applications without having to host a separate
				Keystone server. This is made possible by Keystone&apos;s `getContext`
				API.
			</p>
			<p>
				<em>
					Note: Since you are not starting the keystone server, the Admin UI
					will not be available. You can host Keystone as a separate server if
					you need Admin UI.
				</em>
			</p>
			<p>
				<a href="https://github.com/keystonejs/keystone/tree/main/examples/framework-nextjs-app-directory">
					Check out the example in the repo more info.
				</a>
			</p>
		</section>
	)
}

const QUERY_USERS = `
  id
  name
  nameLast
  email
  phone
`
