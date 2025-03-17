import { promises as fs } from "fs"
import type { Context } from ".keystone/types"

const now = new Date()
const timestamp = now
	.toISOString()
	.replace(/T/, "_")
	.replace(/:/g, "-")
	.split(".")[0] // Format: YYYY-MM-DD_HH-mm-ss

export async function extractDBData(context: Context) {
	console.log("📄⬇️📄 EXTRACT_SEED from current database 📄⬇️📄")

	try {
		const allDBData = (await context.sudo().graphql.run({
			query,
		})) as JSON

		const fileName = `extData.${timestamp}.json`
		const filePath = `./src/keystone/seed/extracted/`

		saveToFile(fileName, filePath, allDBData)
		saveToFile("extData.json", filePath, allDBData)
	} catch (error) {
		console.log("!!! extract: ", error)
	}
}

export const saveToFile = async (
	fileName: string,
	filePath: string,
	data: object
) => {
	try {
		const jsonData = JSON.stringify(data, null, 2)
		await fs.writeFile(filePath + fileName, jsonData, "utf-8")

		console.log("📄 created: ", fileName)
		console.log(`📄⬇️📄 DB has been extracted 📄⬇️📄`)
	} catch (error: any) {
		console.error(`Error writing to file: ${error.message}`)
	}
}

const query = `
  query AllData {
    users {
      id
      name
      nameLast
      authId
      password
      image
      phone
      email
      url
      isActive
      dateCreated
      dateModified
      role {
        name
        id
      }
    }
    roles {
      id
      name
      label
      description
      canViewUsers
      canManageUsers
      canManageRoles
      canManagePosts
      canCreatePosts
    }
    
    posts {
      id
      title
      slug
      status
      template
      pinned
      excerpt
      featured_image
      featured_video
      content {
        document
      }
      author {
        id
        email
      }
      privateAccess {
        id
        email
      }
      dateCreated
      dateModified
    }
  }
`