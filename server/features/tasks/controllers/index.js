import { Client, Users, Databases, ID } from "node-appwrite"
import dotenv from "dotenv"
dotenv.config()

export const createTask = async (req, res, next) => {
  try {
    // { title, description, assigned_by, due_date, assigned_to, jwt }
    const { jwt, ...rest } = req.body
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
    return res
      .status(200)
      .json({ success: true, data, message: "Task added successfully" })
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}

export const getTasks = async (req, res) => {}
