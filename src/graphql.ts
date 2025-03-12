import { envs } from "@/envs"

// const API_URI =  || 'http://localhost:3000/api/graphql'

export const gql = ([content]: TemplateStringsArray) => content

export async function fetchGraphQL(query: string, variables?: Record<string, any>) {
  return fetch(`http://localhost:3001` + `/api/graphql`, {
    method: 'POST',
    body: JSON.stringify({ query, variables }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  })
    .then(x => x.json())
    .then(({ data, errors }) => {
      if (errors) {
        throw new Error(`GraphQL errors occurred:\n${errors.map((x: any) => x.message).join('\n')}`)
      }
      return data
    })
}