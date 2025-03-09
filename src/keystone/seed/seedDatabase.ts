import type { Lists, Context } from ".keystone/types"

import allDataJson from "./extracted/extData.json"
import { envs } from "../../../envs"

const { SEED_PASSWORD_SECRET } = envs

export const seedDatabase = async (context: Context) => {
	console.log(`🌱🌱🌱 Seeding database 🌱🌱🌱`)

	await seedSchemaItems("Role", "name", allDataJson.roles, context)
	await seedSchemaItems("User", "name", allDataJson.users, context)
	// await seedSchemaItems("Category", "name", allDataJson.categories, context)
	await seedSchemaItems("Post", "title", allDataJson.posts, context)

	console.log(`🌲🌲🌲 Seeding complete 🌲🌲🌲`)
}

const seedSchemaItems = async (
	schemaType: string,
	compairKey: string,
	seedJson: any[],
	context: Context
) => {
	// console.log("### seedSchemaItems ###")
	// console.log({ schemaType })
	// console.log({ seedJson })
	const { db: sudoDB } = context.sudo()

	//@ts-ignore
	const itemsAlreadyInDatabase = await sudoDB[schemaType].findMany({
		where: {
			[compairKey]: {
				// @ts-ignore
				in: seedJson.flatMap((item) => item[compairKey]) as string[],
			},
		},
	})

	const itemsToCreate = seedJson.filter(
		(item) =>
			!itemsAlreadyInDatabase.some(
				(prevItem: any) => prevItem[compairKey] === item[compairKey]
			)
	)

	//? remove id as new database will create new ids
	itemsToCreate.forEach((item) => {
		delete item.id
	})

	//@ts-ignore
	const createdItems = await sudoDB[schemaType].createMany({
		data: itemsToCreate.map((item) => ({
			...item,

			//? DOCUMENT field Type (rich text)
			...(item.content ? { content: item.content.document } : {}),
			...(item.description ? { description: item.description.document } : {}),
			...(item.details ? { details: item.details.document } : {}),

			//? Password
			// New passwords are created per user with seeded db.
			...(item.password ? { password: item.email + SEED_PASSWORD_SECRET } : {}),

			//? relation TO ONE
			...(item.role ? { role: { connect: { name: item.role.name } } } : {}),
			...(item.author
				? {
						author: { connect: { email: item.author.email } },
				  }
				: {}),

			//? relation TO MANY
			...(item.locations
				? {
						locations: {
							connect: item.locations?.map((field: any) => ({
								address: field.address,
							})),
						},
				  }
				: {}),

			...(item.privateAccess
				? {
						privateAccess: {
							connect: item.privateAccess?.map((field: any) => ({
								email: field.email,
							})),
						},
				  }
				: {}),

			// ...(item.categories
			// 	? {
			// 			categories: {
			// 				connect: item.categories?.map((field: any) => ({
			// 					name: field.name,
			// 				})),
			// 			},
			// 	  }
			// 	: {}),
		})),
	})

	createdItems.map((item: any) => {
		console.log(` + ${schemaType}: ` + item[compairKey])
	})
}
