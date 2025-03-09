import { permissionsList } from "./permissions"
import { ListAccessArgs } from "./types"

// At it's simplest, the access control returns a yes or no value depending on the users session

export function isLoggedIn({ session }: ListAccessArgs) {
	return !!session
}

const generatedPermissions = Object.fromEntries(
	permissionsList.map((permission: any) => [
		permission,
		function ({ session }: ListAccessArgs) {
			// @ts-ignore
			return !!session?.data.role?.[permission]
		},
	])
)

// Permissions check if someone meets a criteria - yes or no.
export const permissions = {
	...generatedPermissions,
}

// Rule based function
// Rules can return a boolean - yes or no - or a filter which limits which products they can CRUD.
export const rules = {
	canManagePosts({ session }: ListAccessArgs) {
		if (!isLoggedIn({ session })) return false

		// 1. Do they have the permission
		if (permissions.canManagePosts({ session })) return true

		// 2. If not, do they own this item?
		return {
			author: { id: { equals: session?.itemId || "no_session.itemId" } },
		}
	},
	canViewPosts({ session }: ListAccessArgs) {
		//? posts are public. don't need login for guests to view
		// if (!isLoggedIn({ session })) return false;

		if (permissions.canManagePosts({ session })) return true

		return {
			OR: [
				{
					author: { id: { equals: session?.itemId || "no_session.itemId" } },
				},
				{
					privateAccess: {
						some: { id: { in: [session?.itemId || "no_session.itemId"] } },
					},
				},
				{ status: { equals: "PUBLIC" } },
			],
		}

		//todo get rid of comment if good
		// return { status: { equals: "PUBLIC" } }
	},

	canManageUsers({ session }: ListAccessArgs) {
		if (!isLoggedIn({ session })) return false

		if (permissions.canManageUsers({ session })) return true
		if (!session) return false

		// Otherwise they may only update themselves!
		return { id: { equals: session?.itemId || "no_session.itemId" } }
	},
}
