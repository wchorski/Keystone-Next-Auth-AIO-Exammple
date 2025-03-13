import { createYoga } from "graphql-yoga"
import { keystoneContext } from "../../../keystone/context"
import { NextRequest, NextResponse } from "next/server"

export const config = {
	api: {
		bodyParser: false,
	},
}

const handler = createYoga<{
	req: NextRequest
	// res: NextResponse
}>({
	graphqlEndpoint: "/api/graphql",
	schema: keystoneContext.graphql.schema,
	context: ({ req }) => keystoneContext.withRequest(req),
	
})

export { handler as GET, handler as POST }
// export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS }
