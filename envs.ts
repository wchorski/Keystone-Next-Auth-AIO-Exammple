import { DatabaseProvider } from "@keystone-6/core/types"

require("dotenv").config()

// Packages and Runtime
const NODE_ENV = process.env.NODE_ENV || 'development'

// DATABASE
const DB_PROVIDER = process.env.DB_PROVIDER as DatabaseProvider || "sqlite"
const DB_USER = process.env.DB_USER!
const DB_PASSWORD = process.env.DB_PASSWORD!
const DB_DOMAIN = process.env.DB_DOMAIN!
const DB_PORT = process.env.DB_PORT!
const DB_COLLECTION = process.env.DB_COLLECTION!
const DB_TIMEOUT = process.env.DB_TIMEOUT!
const SEED_EXTRACT_NONE = process.env.SEED_EXTRACT_NONE

// Content Management System
const CMS_PROTOCAL = process.env.NEXT_PUBLIC_CMS_PROTOCAL!
const CMS_DOMAIN = process.env.NEXT_PUBLIC_CMS_DOMAIN!
const CMS_PORT = Number(process.env.NEXT_PUBLIC_CMS_PORT!)!
const CMS_URL = `${CMS_PROTOCAL}://${CMS_DOMAIN}:${CMS_PORT}`

// Website Frontend
const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL!
const SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE!
const SITE_DESCRIPTION = process.env.NEXT_PUBLIC_SITE_DESCRIPTION!
const PERPAGE = Number(process.env.PERPAGE)! || 20

// AUTH
const NEXTAUTH_URL = process.env.NEXTAUTH_URL!
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET!
const SEED_PASSWORD_SECRET = process.env.SEED_PASSWORD_SECRET || ''
const WORK_FACTOR = Number(process.env.WORK_FACTOR!)!
const GITHUB_AUTH_ID = process.env.GITHUB_AUTH_ID
const GITHUB_AUTH_SECRET = process.env.GITHUB_AUTH_SECRET
const GOOGLE_AUTH_ID = process.env.GOOGLE_AUTH_ID
const GOOGLE_AUTH_SECRET = process.env.GOOGLE_AUTH_SECRET

// Plugins
const ANALYTICS_URL = process.env.NEXT_PUBLIC_UMAMI_URL

// const DB_PROTOCAL = (() => {
//   switch (DB_PROVIDER) {
//     case 'postgresql':
//       return 'postgres'
//     case 'mysql':
//       return 'mysql'
//     default:
//       return 'sqlite'
//   }
// })()

const DATABASE_URL = (() => {
  switch (DB_PROVIDER) {
    case 'postgresql':
      return `postgres://${DB_USER}:${DB_PASSWORD}@${DB_DOMAIN}:${DB_PORT}/${DB_COLLECTION}?connect_timeout=${DB_TIMEOUT}`
    case 'mysql':
      throw new Error('havnt worked with mysql in this example proj')
    case 'sqlite':
      return `file:${process.cwd()}/keystone.db` // next.js requires an absolute path for sqlite
    default:
      throw new Error('no db provider set')
  }
})()

export const envs = {
	DATABASE_URL,
	DB_PROVIDER,
  CMS_URL,
  CMS_PORT,
  ANALYTICS_URL,
  FRONTEND_URL,
  NODE_ENV,
  NEXTAUTH_URL,
  NEXTAUTH_SECRET,
  GITHUB_AUTH_ID,
  GITHUB_AUTH_SECRET,
  GOOGLE_AUTH_ID,
  GOOGLE_AUTH_SECRET,
  WORK_FACTOR,
  SEED_PASSWORD_SECRET,
  SEED_EXTRACT_NONE,
  SITE_TITLE,
  SITE_DESCRIPTION,
  PERPAGE,
}
