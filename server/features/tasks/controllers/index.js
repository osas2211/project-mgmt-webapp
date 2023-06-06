import { Client, Users, Databases, ID, Query } from "node-appwrite"
import dotenv from "dotenv"
dotenv.config()

export const createTask = async (req, res, next) => {
  try {
    // { title, description, assigned_by, due_date, assigned_to, jwt }
    const { jwt, projectID, ...rest } = req.body
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(process.env.PROJECT_ID)
      .setKey(process.env.API_KEY)
    const db = new Databases(client)

    const data = await db.createDocument(
      process.env.DATABASE_ID,
      process.env.TASK_COLLECTION_ID,
      ID.unique(),
      rest
    )
    const project = await db.getDocument(
      process.env.DATABASE_ID,
      process.env.PROJECT_COLLECTION_ID,
      projectID
    )
    await db.updateDocument(
      process.env.DATABASE_ID,
      process.env.PROJECT_COLLECTION_ID,
      projectID,
      { tasks: [...project.tasks, data.$id] }
    )
    return res
      .status(200)
      .json({ success: true, data, message: "Task added successfully" })
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}

export const getTasks = async (req, res) => {
  try {
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(process.env.PROJECT_ID)
      .setKey(process.env.API_KEY)
    const db = new Databases(client)
    const { projectID } = req.query
    const project = await db.getDocument(
      process.env.DATABASE_ID,
      process.env.PROJECT_COLLECTION_ID,
      projectID
    )
    const tasksID = project.tasks
    const tasks = await db.listDocuments(
      process.env.DATABASE_ID,
      process.env.TASK_COLLECTION_ID,
      [Query.equal("$id", tasksID)]
    )
    return res
      .status(200)
      .json({ success: true, data: { tasks: tasks.documents } })
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}
