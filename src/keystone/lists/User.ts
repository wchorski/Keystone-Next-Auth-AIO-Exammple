import { graphql, group, list } from "@keystone-6/core"
import type { Lists } from ".keystone/types"
import {
	checkbox,
	relationship,
	text,
	timestamp,
	virtual,
} from "@keystone-6/core/fields"
var bcrypt = require("bcryptjs")
import { envs } from "../../../envs"

import { permissions, rules } from "../access"
import { allowAll } from "@keystone-6/core/access"

const { WORK_FACTOR } = envs

export const User: Lists.User = list({
	// access: allowAll,
	access: {
		filter: {
			// query: () => true,
			query: rules.canManageUsers,
			update: rules.canManageUsers,
			// delete: () => false,
		},
		operation: {
			query: () => true,
			// query: permissions.canViewUsers,
			create: permissions.canManageUsers,
			update: permissions.canManageUsers,
			delete: permissions.canManageUsers,
		},
	},

	ui: {
		//? filter handles ui filtering
		// hideCreate: args => !permissions.canManageUsers(args),
		// hideCreate: (args) => !permissions.canManageUsers(args),
		// hideDelete: (args) => !permissions.canManageUsers(args),
		// isHidden: (args) => !permissions.canManageUsers(args),
		listView: {
			initialColumns: ["name", "nameLast", "email", "role"],
			initialSort: { field: "dateCreated", direction: "DESC" },
		},
		//? maybe I'd prefer email? idk
		labelField: `name`,
	},

	// this is the fields for our User list
	fields: {
		// by adding isRequired, we enforce that every User should have a name
		//   if no name is provided, an error will be displayed
		typeof: virtual({
			field: graphql.field({
				type: graphql.String,
				resolve() {
					return "User"
				},
			}),
			ui: {
				itemView: { fieldMode: "hidden" },
			},
		}),
		name: text({ validation: { isRequired: true, length: { min: 3 } } }),
		nameLast: text(),
		authId: text({
			isIndexed: "unique",
			validation: { isRequired: true },
			ui: {
				description: `!!! Register users through this link ${envs.FRONTEND_URL}/register.`,
			},
		}),
		image: text({}),
		phone: text({}),
		//TODO trim any white space around this address before saving to db
		email: text({
			validation: { isRequired: true },

			// by adding isIndexed: 'unique', we're saying that no user can have the same
			// email as another user - this may or may not be a good idea for your project
			isIndexed: "unique",
			//? was thinking of lower caps all saved data, but would cause problems down the road
			// hooks:{
			//   beforeOperation(){

			//   }
			// }
		}),

		password: text({
			//TODO may not work for OAuth, but not worrying about right now
			validation: { isRequired: true },
			ui: {
				description:
					"Can only be changed via `passwordReset` mutation + access to owner's email",
				itemView: {
					fieldMode: "hidden",
				},
				// itemView: {
				// 	fieldMode: ({ session, context, item }) =>
				// 		permissions.canManageUsers({ session }) ? "read" : "hidden",
				// },
			},
			access: {
				read: ({ session, context, listKey, fieldKey, operation, item }) =>
					permissions.canManageUsers({ session }),
			},
			hooks: {
				beforeOperation: async ({ operation, resolvedData }) => {
					if (operation === "create" || operation === "update") {
						if (!resolvedData?.password) return console.log("no password set")
						const hash = await bcrypt.hash(resolvedData?.password, WORK_FACTOR)
						resolvedData.password = hash
					}
				},
			},
		}),
		url: text(),
		isActive: checkbox({ defaultValue: true }),

		role: relationship({
			ref: "Role.assignedTo",
			// todo add access control
			access: {
				create: permissions.canManageUsers,
				update: permissions.canManageUsers,
			},
			ui: {
				description:
					"🔒 Setting someone to a high permission like Admin could be a grave mistake. Be careful",
				createView: { fieldMode: "hidden" },
				itemView: { fieldMode: "edit" },
			},
		}),
		posts: relationship({ ref: "Post.author", many: true }),
		privatePostsAccess: relationship({ ref: "Post.privateAccess", many: true }),
		...group({
			label: "Inventory",
			// description: 'Group description',

			fields: {
				dateCreated: timestamp({
					defaultValue: { kind: "now" },
					validation: { isRequired: true },
				}),
				dateModified: timestamp({
					defaultValue: { kind: "now" },
					db: {
						updatedAt: true,
					},
					//? `updatedAt: true,` updates date anytime data is mutated
					// hooks: {
					// 	beforeOperation({ resolvedData, operation }) {
					// 		if (operation === "create" || operation === "update") {
					// 			resolvedData.dateModified = new Date().toISOString()
					// 		}
					// 	},
					// },
				}),
			},
		}),
	},
	hooks: {
		// beforeOperation: {
		// 	create: async ({ resolvedData, item }) => {},
		// 	update: async ({ resolvedData, item }) => {},
		// },
		afterOperation: {
			create: async ({ context, item }) => {
				const mail = (await context
					.sudo()
					.graphql.run({
						query: `
              mutation VerifyEmailRequest($email: String!) {
                verifyEmailRequest(email: $email) {
                  id
                }
              }
            `,
						variables: {
							email: item.email,
						},
					})
					.catch((err) =>
						console.log(`!!! verify email did not send: ${item.email}`)
					)) as object
			},
		},
	},
})
