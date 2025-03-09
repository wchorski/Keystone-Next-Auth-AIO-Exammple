import { list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'
import { text, timestamp } from '@keystone-6/core/fields'
import { document } from '@keystone-6/fields-document'
import { User } from "./lists/User"
import { Role } from "./lists/Role"
import { Post } from "./lists/Post"
import { type Lists } from '.keystone/types'

export const lists = {
  User,
  Role,
  Post,
} satisfies Lists
