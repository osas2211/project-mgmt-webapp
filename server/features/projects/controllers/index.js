import {
  Client,
  Account,
  Teams,
  Databases,
  ID,
  Storage,
  Query,
} from "node-appwrite"

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
    const { title, project_cover, email, ...rest } = req.body
    const team = await teams.create(ID.unique(), title)
    await teams.createMembership(
      team.$id,
      ["owner"],
      "http://localhost:8000",
      email
    )
    let project
    if (project_cover) {
      project = await db.createDocument(
        process.env.DATABASE_ID,
        process.env.PROJECT_COLLECTION_ID,
        team.$id,
        { title, ...rest, project_cover }
      )
    } else {
      project = await db.createDocument(
        process.env.DATABASE_ID,
        process.env.PROJECT_COLLECTION_ID,
        team.$id,
        { title, ...rest }
      )
    }
    return res.status(200).json({
      success: true,
      data: { team, project },
      message: "Project Created successfully",
    })
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}

export const getProjects = async (req, res, next) => {
  try {
    const { jwt } = req.query
    const client = new Client()
    client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(process.env.PROJECT_ID)
      .setJWT(jwt)
    const db = new Databases(client)
    const team = new Teams(client)
    const teams = await team.list()
    const teams_id = teams.teams.map((team) => team.$id)
    const projects = await db.listDocuments(
      process.env.DATABASE_ID,
      process.env.PROJECT_COLLECTION_ID,
      [Query.equal("$id", teams_id), Query.orderDesc("$createdAt")]
    )
    return res.status(200).json({
      success: true,
      data: { projects: projects.documents },
    })
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}

export const getProject = async (req, res, next) => {
  try {
    const { jwt } = req.query
    const { id } = req.params
    const client = new Client()
    client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(process.env.PROJECT_ID)
      .setKey(process.env.API_KEY)
    const db = new Databases(client)
    const teams = new Teams(client)
    const team = await teams.get(id)
    const members = await teams.listMemberships(id)
    const project = await db.getDocument(
      process.env.DATABASE_ID,
      process.env.PROJECT_COLLECTION_ID,
      id
    )
    console.log({ project, members })
    return res.status(200).json({
      success: true,
      data: { project, members },
    })
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}
