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
const CMS_URL = NODE_ENV !== 'production' ? process.env.CMS_URL! : 'http://cms:3001'

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
  ANALYTICS_URL,
}
