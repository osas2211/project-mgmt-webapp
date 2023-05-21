import { Users, Client } from "node-appwrite"
import dotenv from "dotenv"
dotenv.config()
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.PROJECT_ID)
  .setKey(process.env.API_KEY)
const users = new Users(client)

// POST - CREATE A NEW USER
export const createUser = async (req, res, next) => {
  try {
    const { username, email, password, fullname } = req.body

    const users = new Users(client)
    const user = await users.create(
      username,
      email,
      undefined,
      password,
      fullname
    )
    const { ...rest } = user
    return res.status(200).json({
      success: true,
      message: "account creation was successful",
      data: user,
    })
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}

export const login = async (req, res, next) => {
  try {
    await users
  } catch (error) {}
}
