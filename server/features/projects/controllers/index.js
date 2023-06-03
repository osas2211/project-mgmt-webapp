import { Client, Account, Teams, Databases, ID } from "node-appwrite"

const globalClient = new Client()
globalClient
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.PROJECT_ID)
  .setKey(process.env.API_KEY)
const teams = new Teams(globalClient)
const db = new Databases(globalClient)
export const createProject = async (req, res, next) => {
  try {
    // const {
    //   title,
    //   project_cover,
    //   description,
    //   files_links,
    //   status,
    //   priority,
    //   end_date,
    // } = req.body
    const { title, ...rest } = req.body
    // Create Team first
    const team = await teams.create(ID.unique(), title)

    const project = await db.createDocument(
      process.env.DATABASE_ID,
      process.env.PROJECT_COLLECTION_ID,
      team.$id,
      { title, ...rest }
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
