import { checkbox } from "@keystone-6/core/fields"
import { group } from "@keystone-6/core"
//! When you add a field here also add it to these files below
//! `session.ts` `userQuery` object on top
//! `/types/next-auth.d.ts` under `role:`
//! `fetchUserById.ts` query
export const permissionFields = {
	canViewUsers: checkbox({
		defaultValue: false,
		label: "Users Viewer: Can query any User",
	}),
	canManageUsers: checkbox({
		defaultValue: false,
		label: "Users Manager: Can edit any User",
	}),
	canManageRoles: checkbox({
		defaultValue: false,
		label: "Roles Manager: Can create / read / update / delete any Role",
	}),
	...group({
		label: "Posts",
		// description: 'Group description',
		fields: {
			canManagePosts: checkbox({
				defaultValue: false,
				label: "Posts Manager: Can see and manage any post",
			}),
			canCreatePosts: checkbox({
				defaultValue: false,
				label: "Posts Create: Can create and edit their own authored posts",
			}),
		},
	}),
}

export type Permission = keyof typeof permissionFields

export const permissionsList: Permission[] = Object.keys(
	permissionFields
) as Permission[]
