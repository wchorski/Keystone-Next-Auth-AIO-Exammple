require("dotenv").config()
import { config } from "@keystone-6/core"
import { extendGraphqlSchema, lists } from "./src/keystone/schema"
import type { Context } from ".keystone/types"
import { envs } from "./envs"
import { nextAuthSessionStrategy } from "./session"
import { seedDatabase } from "./src/keystone/seed/seedDatabase"
import { extractDBData } from "./src/keystone/seed/extractDBData"

const {
	CMS_PORT,
	DATABASE_URL,
	DB_PROVIDER,
	FRONTEND_URL,
	SEED_EXTRACT_NONE,
	NODE_ENV,
} = envs

export default config({
	db: {
		provider: DB_PROVIDER,
		url: DATABASE_URL,

		onConnect: async (context: Context) => {
			console.log(`💾✅ Database Connected`)
			// TODO why argv doesn't work?
			if (
				SEED_EXTRACT_NONE === "seed"
				// && NODE_ENV === "development"
			) {
				//todo would like to have this as an arg instead of env var
				// if (process.argv.includes('--seed-database')) {
				await seedDatabase(context)
			} else if (
				SEED_EXTRACT_NONE === "extract" 
        // && NODE_ENV === "development"
			) {
				await extractDBData(context)
			}
		},
		// WARNING: this is only needed for our monorepo examples, dont do this
		// prismaClientPath: 'node_modules/myprisma',
	},
	server: {
		port: CMS_PORT,
		cors: { origin: [FRONTEND_URL], credentials: true },
	},
	graphql: {
		extendGraphqlSchema,
	},
	// https://github.com/keystonejs/keystone/discussions/7746
	ui: {
		isDisabled: false,
		basePath: "/admin",
		// TODO add rule that checks Role.adminDashboardAccess
		// isAccessAllowed: ({session}) => true,
		publicPages: [
			FRONTEND_URL + "/api/auth/csrf",
			FRONTEND_URL + "/api/auth/signin",
			FRONTEND_URL + "/api/auth/callback",
			FRONTEND_URL + "/api/auth/session",
			FRONTEND_URL + "/api/auth/providers",
			FRONTEND_URL + "/api/auth/signout",
			FRONTEND_URL + "/api/auth/error",

			//! each provider will need a separate callback and signin page listed here
			FRONTEND_URL + "/api/auth/signin/github",
			FRONTEND_URL + "/api/auth/callback/github",
			FRONTEND_URL + "/api/auth/signin/credentials",
			FRONTEND_URL + "/api/auth/callback/credentials",
		],

		// adding page middleware ensures that users are redirected to the signin page if they are not signed in.
		pageMiddleware: async ({ wasAccessAllowed }) => {
			if (wasAccessAllowed) return

			return {
				kind: "redirect",
				to: FRONTEND_URL + "/api/auth/signin",
			}
		},
	},
	session: nextAuthSessionStrategy,
	lists,
})
