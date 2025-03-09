import type {
	Lists,
} from ".keystone/types"

export type Session = {
	user?:
		| {
				name?: string | null | undefined
				email?: string | null | undefined
				image?: string | null | undefined
		  }
		| undefined
	authId: string
	id: string
	itemId: string
	data: {
		role?: Role
	}
	expires: string
}

export type ListAccessArgs = {
	itemId?: string
	session?: Session
	context?: any
}

export type Post = Lists.Post.Item & {
  author: User,
}

export type User = Lists.User.Item & {
  role: Role,
  posts: Post[]
}

export type Role = Lists.Role.Item & {
	assignedTo: Lists.User.Item[]
}

export type ColorsTheme =
	| "bg_c_plain"
	| "bg_c_primary"
	| "bg_c_secondary"
	| "bg_c_tertiary"
	| "bg_c_accent"
	| "bg_c_transparent"
	| "bg_c_reverse_theme"
	| "outline_c_secondary"
	| "outline_c_tertiary"