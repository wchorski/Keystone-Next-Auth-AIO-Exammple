require("dotenv").config()
import { config } from "@keystone-6/core"
import { lists } from "./src/keystone/schema"
import { seedDemoData } from "./src/keystone/seed"
import type { Context } from ".keystone/types"
import { envs } from "./envs"

const { DATABASE_URL, DB_PROVIDER} = envs

export default config({
	db: {
		provider: DB_PROVIDER,
		url: DATABASE_URL,

		onConnect: async (context: Context) => {
			await seedDemoData(context)
		},
		// WARNING: this is only needed for our monorepo examples, dont do this
		// prismaClientPath: 'node_modules/myprisma',
		// prismaClientPath: "node_modules/.prisma/client",
	},
	server: {
		port: 3001,
	},
	// https://github.com/keystonejs/keystone/discussions/7746
	ui: {
		isDisabled: false,
		basePath: "/admin",
	},
	lists,
})
