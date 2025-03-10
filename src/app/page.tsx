import React from "react"
import { DocumentRender } from "./DocumentRender"
import { fetchUsers } from "./fetch/fetchUsers"
import { envs } from "@/envs"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { nextAuthOptions } from "@/session"
import SignOutButton from "@components/SignOutButton"
import { UsersListClient } from "@components/UsersListClient"

const { PERPAGE } = envs
const page = 1

export default async function HomePage() {
	// WARNING: this does nothing for now
	//   you will probably use getServerSession from 'next/auth'
	//   https://next-auth.js.org/configuration/nextjs#in-app-directory
	const session = await getServerSession(nextAuthOptions)
	const { users, error } = await fetchUsers({
		query,
		page,
		perPage: PERPAGE,
		session,
	})

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

			<h1>Next.js 🤝 Keystone</h1>
			<div>
				<p>
					<strong>Users fetched from the server</strong>
				</p>
				<ol>
					{users && users.length > 0 ? (
						users.map((u) => {
							return (
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
							)
						})
					) : (
						<p>no users found.{!session && " not authorized to see data"}</p>
					)}
				</ol>
			</div>

      <h2>Users fetch from client (GQL)</h2>
      <p>#TODO</p>
      <UsersListClient />

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

const query = `
  id
  name
  nameLast
  email
  phone
`
