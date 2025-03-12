"use client"

import { Suspense } from "react"
import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	TypedDocumentNode,
	createHttpLink,
	gql,
	useSuspenseQuery,
} from "@apollo/client"
import { envs } from "@/envs"

interface Data {
	users: {
		id: string
		name: string
		email: string
	}[]
}

interface Variables {}

const QUERY_USERS: TypedDocumentNode<Data, Variables> = gql`
	query {
		users {
			id
			name
			email
		}
	}
`

// const link = createHttpLink({
// 	uri: `${envs.CMS_URL}/api/graphql`,
// 	fetchOptions: {
// 		credentials: "include",
// 	},
// 	credentials: "include",
// })

// const client = new ApolloClient({
// 	cache: new InMemoryCache(),
// 	link,
// })

export function UsersListClientApollo() {
	return (
		// <ApolloProvider client={client}>
		<Suspense fallback={<div>Loading...</div>}>
			<Users />
		</Suspense>
		// </ApolloProvider>
	)
}

interface UserProps {}

function Users({}: UserProps) {
	const { data } = useSuspenseQuery(QUERY_USERS, {
		variables: {},
	})
	console.log("## data.users")
	console.log(data.users)

	const { users } = data

	return (
		<ol>
			{users && users.length > 0 ? (
				users.map((u) => (
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
				))
			) : (
				<p>no users found</p>
			)}
		</ol>
	)
	// return (
	// 	<ol>
	// 		{users && users.length > 0 ? (
	// 			<ol>
	// 				{users.map((u) => (
	// 					<li key={u.id}>
	// 						<hr />
	// 						<span>{u.name} </span>
	// 						<br />
	// 						<span>{u.email} </span>
	// 						{/* {u.about && (
	//                 <>

	//                   <DocumentRender document={u.about?.document} />
	//                 </>
	//               )} */}
	// 					</li>
	// 				))}
	// 			</ol>
	// 		) : (
	// 			<p>no users found</p>
	// 		)}
	// 	</ol>
	// )
}
