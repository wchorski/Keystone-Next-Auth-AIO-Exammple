//! Credentials do not pass with this function!!!!
// const API_URI =  || 'http://localhost:3000/api/graphql'

type Props = {
	query: string
	variables?: Record<string, any>
}

export const gql = ([content]: TemplateStringsArray) => content

export async function fetchGraphQL({ query, variables }: Props) {
	try {
    console.log('get users');
		const res = await fetch(`http://localhost:3001` + `/api/graphql`, {
			method: "POST",
			body: JSON.stringify({ query, variables }),
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		})

		const data = await res.json()
		JSON.stringify({data}, null ,2)

		return data
		// .then(x => x.json())
		// .then(({ data, errors }) => {
		// if (errors) {
		//   throw new Error(`GraphQL errors occurred:\n${errors.map((x: any) => x.message).join('\n')}`)
		// }
		//   return data
		// })
	} catch (error: any) {
    console.log(error);
		throw new Error(
			`GraphQL errors occurred:\n${error.map((x: any) => x.message).join("\n")}`
		)
	}
}
