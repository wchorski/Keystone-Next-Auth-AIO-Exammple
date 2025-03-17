import React from "react"
// import { DocumentRender } from "./DocumentRender"
import { fetchUsers } from "./fetch/fetchUsers"
import { envs } from "@/envs"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { nextAuthOptions } from "@/session"
import SignOutButton from "@components/SignOutButton"
import { UsersListClient } from "@components/UsersListClient"
// import { fetchGraphQL, gql } from "../graphql"
import { FakeDataComponent } from "@components/FakeDataSuspense"
import { fetchPosts } from "./fetch/fetchPosts"
import { PostsListClient } from "@components/PostsListClient"
import { VerifyEmailCard } from "@components/VerifyEmailCard"

const { PERPAGE } = envs
const page = 1

export default async function HomePage() {
	// WARNING: this does nothing for now
	//   you will probably use getServerSession from 'next/auth'
	//   https://next-auth.js.org/configuration/nextjs#in-app-directory
	const session = await getServerSession(nextAuthOptions)
	const { users, error: errorUsers } = await fetchUsers({
		query: QUERY_USERS,
		page,
		perPage: PERPAGE,
		session,
	})
	const { posts, error: errorPosts } = await fetchPosts({
		query: QUERY_POSTS,
		page,
		perPage: PERPAGE,
		session,
	})

	// Apollo client fetch (Server Side)
	// const { data } = await getClient().query({ query: userQuery })
	// `query` is a shortcut for `getClient().query`
	// const { data } = await fetchGraphQL({
	// 	query: gql`
	// 		query Users {
	// 			users {
	// 				id
	// 				name
	// 				email
	// 			}
	// 		}
	// 	`,
	// 	variables: {},
	// })

	if (errorUsers || errorPosts)
		return (
			<section>
				<p>{errorUsers?.toString() || errorPosts?.toString()}</p>
			</section>
		)

	return (
		<main>
			{session ? (
				<>
					<p>
						Logged in as {session.user?.email}
						<br />
						<Link href={`/admin`}>Admin Dashboard CMS</Link>
						<br />
						<SignOutButton />
					</p>
					{!session.data.role && <VerifyEmailCard email={session.user.email} />}
				</>
			) : (
				<Link href={`/login`}>Login</Link>
			)}

			<h2>Next.js 🤝 Keystone</h2>

			{/* <FakeDataComponent /> */}
			<h3>Users: </h3>
			<div className="col-3">
				<section className={"card"}>
					<h4>Users fetch with Client Component (From Browser)</h4>
					{/* <UsersListClientApollo /> */}
					<UsersListClient />
				</section>

				<section className={"card"}>
					<h4>Users fetched GQL (Server Side)</h4>
					<p>
						credentials do not get passed. Authorization does not happen here.
						it's preferable to use <code>keystoneContext</code> for data
						fetching on server
					</p>
					{/* <pre>{JSON.stringify({ data }, null, 2)}</pre> */}
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

				<section className={"card"}>
					<h4>
						Users fetched from the server using Keystone Context
						(keystoneContext)
					</h4>
					{users && users.length > 0 ? (
						<ol>
							{users.map((u) => (
								<li key={u.id}>
									<span>{u.name} </span>
									<br />
									<span>{u.email} </span>
									<br />
									<span>Role: {u?.role?.name || "unverified"} </span>
									<hr />
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
			</div>

			<h3>Posts: </h3>
			<div className="col-3">
				<section>
					<h4>Fetched by server (keystoneContext)</h4>
					{posts ? (
						<ol>
							{posts.map((p) => (
								<li className="card">
									<h5>{p.title}</h5>
									<p>{p.excerpt}</p>

									<Link href={`/posts/${p.id}`}>read more...</Link>
								</li>
							))}
						</ol>
					) : (
						<p>no posts found</p>
					)}
				</section>

				<section>
					<h4>Fetched client side (useFetchGraphQL)</h4>
					<PostsListClient />
				</section>
			</div>

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
		</main>
	)
}

const QUERY_USERS = `
  id
  name
  nameLast
  email
  phone
  role {
    id
    name
  }
`

const QUERY_POSTS = `
  id
  title
  excerpt
`
