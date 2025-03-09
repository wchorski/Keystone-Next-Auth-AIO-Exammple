// cred - https://stackoverflow.com/questions/69602694/how-to-update-the-type-of-session-in-session-callback-in-next-auth-when-using-ty

import NextAuth from "next-auth"

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			/** The user's name. */
			name: string
			nameLast: string
			email: string
			id: string
			stripeCustomerId: string
			image: string
		}
		itemId: string
		authId: string
		data: {
			role: {
				id: string
				name: string
				canManageUsers: boolean
				canViewUsers: boolean
				canManageRoles: boolean
				canManagePosts: boolean
				canCreatePosts: boolean
			}
		}
	}
}
