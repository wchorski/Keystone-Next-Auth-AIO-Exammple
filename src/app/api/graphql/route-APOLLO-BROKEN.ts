import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { keystoneContext } from "@ks/context";

import { readFileSync } from "fs";
import { join } from 'path'
import gql from "graphql-tag";

const typeDefs = gql(readFileSync(join(process.cwd(), 'schema.graphql'), 'utf8'))

const server = new ApolloServer({
    typeDefs,
    resolvers: {}, // No need to define resolvers manually; use Keystone context
});

// Typescript: req has the type NextRequest
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context: async req => keystoneContext,
});

export async function POST(req: NextRequest) {
  return handler(req)
}

export async function GET(req: NextRequest) {
  return handler(req)
}
// export { handler as GET, handler as POST };