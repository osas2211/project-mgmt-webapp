import { Client, Account, Teams, Databases, ID, Storage } from "node-appwrite"

const globalClient = new Client()
globalClient
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.PROJECT_ID)
  .setKey(process.env.API_KEY)
const teams = new Teams(globalClient)
const db = new Databases(globalClient)
const storage = new Storage(globalClient)
export const createProject = async (req, res, next) => {
  try {
    const { title, project_cover, ...rest } = req.body
    const team = await teams.create(ID.unique(), title)
    const project = await db.createDocument(
      process.env.DATABASE_ID,
      process.env.PROJECT_COLLECTION_ID,
      team.$id,
      { title, ...rest, project_cover }
    )
    return res.status(200).json({
      success: true,
      data: { team, project },
      message: "Project Created successfully",
    })
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}
