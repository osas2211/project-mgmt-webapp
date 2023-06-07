import {
  Client,
  Account,
  Teams,
  Databases,
  ID,
  Storage,
  Query,
  Users,
} from "node-appwrite"

const globalClient = new Client()
globalClient
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.PROJECT_ID)
  .setKey(process.env.API_KEY)
const teams = new Teams(globalClient)
const db = new Databases(globalClient)
const storage = new Storage(globalClient)
const users = new Users(globalClient)
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
    if (teams.teams.length === 0)
      return res.status(200).json({ data: { projects: [] } })

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
    const users = new Users(client)
    const team = await teams.get(id)
    const members = (await teams.listMemberships(id)).memberships
    const members_essentials = members.map((member) => {
      return { id: member.userId, name: member.userName }
    })
    const members_id = members.map((member) => {
      return member.userId
    })
    const profiles = await users.list([Query.equal("$id", members_id)])
    const members_img = profiles.users.map((user) => user.prefs.profile_picture)
    const project = await db.getDocument(
      process.env.DATABASE_ID,
      process.env.PROJECT_COLLECTION_ID,
      id
    )
    return res.status(200).json({
      success: true,
      data: { project, members: members_essentials, members_img },
    })
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}

export const addCollaborator = async (req, res, next) => {
  try {
    const { userID, projectID } = req.body
    const user = await users.get(userID)
    console.log(user)
    if (!user) throw new Error("User Not Found")
    const email = user.email
    await teams.createMembership(
      projectID,
      ["member"],
      "https://cloud.appwrite.io/v1",
      email
    )
    return res.status(200).json({
      success: true,
      message: `${userID} has been Added as collaborator`,
    })
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}

export const delA = async (req, res, next) => {
  try {
    const docs = await db.listDocuments(
      process.env.DATABASE_ID,
      process.env.PROJECT_COLLECTION_ID
    )
    const ids = docs.documents.map((doc) => doc.$id)
    console.log(ids)
    ids.forEach(
      async (id) =>
        await db.deleteDocument(
          process.env.DATABASE_ID,
          process.env.PROJECT_COLLECTION_ID,
          id
        )
    )

    // const teams_ = await teams.list()
    // const ids = teams_.teams.map((team) => team.$id)
    // ids.forEach(async (id) => await teams.delete(id))
    // console.log(ids)
    // return res.status(200).json({
    //   success: true,
    // })

    return res.status(200).json({
      success: true,
    })
  } catch (error) {
    return res.status(error.code).json({ success: false, message: error })
  }
}
