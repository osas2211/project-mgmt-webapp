import { Client, Users, Databases, ID, Query } from "node-appwrite"
import dotenv from "dotenv"
dotenv.config()
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.PROJECT_ID)
  .setKey(process.env.API_KEY)
const db = new Databases(client)

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

export const getUserTasks = async (req, res) => {
  try {
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(process.env.PROJECT_ID)
      .setKey(process.env.API_KEY)
    const db = new Databases(client)

    const { id } = req.query
    const tasks = await db.listDocuments(
      process.env.DATABASE_ID,
      process.env.TASK_COLLECTION_ID
    )
    const userTasks = tasks.documents.filter((task) => task.assigned_to === id)
    return res.status(200).json({ success: true, data: { tasks: userTasks } })
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}

export const updateTask = async (req, res) => {}
export const deleteTask = async (req, res) => {
  // FOR ADMIN ONLY(assigned_by)
  try {
    const { id } = req.params
    console.log(id)

    const task = await db.getDocument(
      process.env.DATABASE_ID,
      process.env.TASK_COLLECTION_ID,
      id
    )

    // Delete Task
    await db.deleteDocument(
      process.env.DATABASE_ID,
      process.env.TASK_COLLECTION_ID,
      id
    )

    // Remove ID from project Document
    const project = await db.getDocument(
      process.env.DATABASE_ID,
      process.env.PROJECT_COLLECTION_ID,
      task.project
    )
    await db.updateDocument(
      process.env.DATABASE_ID,
      process.env.PROJECT_COLLECTION_ID,
      project.$id,
      { tasks: project.tasks.filter((taskID) => taskID !== id) }
    )
    return res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" })
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}
