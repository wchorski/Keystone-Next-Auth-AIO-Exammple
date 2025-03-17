import { graphql } from '@keystone-6/core'
import { User } from "./lists/User"
import { Role } from "./lists/Role"
import { Post } from "./lists/Post"
import { type Lists } from '.keystone/types'
import { registerAnAccount } from './mutations/registerAnAccount'
import { passwordRequestLink } from './mutations/passwordRequestLink'
import { passwordReset } from './mutations/passwordReset'
import { verifyEmailRequest } from './mutations/verifyEmailRequest'
import { verifyEmail } from './mutations/verifyEmail'

export const lists = {
  User,
  Role,
  Post,
} satisfies Lists

export const extendGraphqlSchema = graphql.extend((base) => {
	return {
		mutation: {
			registerAnAccount: registerAnAccount(base),
			passwordRequestLink: passwordRequestLink(base),
			passwordReset: passwordReset(base),
			verifyEmailRequest: verifyEmailRequest(base),
			verifyEmail: verifyEmail(base),
			
		},
	}
})