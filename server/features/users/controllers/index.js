import { Users, Client } from "node-appwrite"
import dotenv from "dotenv"
dotenv.config()
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6463da5b176aab1a02e1")
  .setKey(process.env.API_KEY)
const users = new Users(client)

// POST - CREATE A NEW USER
export const createUser = async (req, res, next) => {
  const { username, email, password, fullName } = req.body
  try {
    const users = new Users(client)
    const user = await users.createBcryptUser(
      username,
      email,
      password,
      fullName
    )
    return res
      .status(200)
      .json({ success: true, message: "account creation was successful", user })
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}
