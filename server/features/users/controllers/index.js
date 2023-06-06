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
    await users.updatePrefs(user.$id, {
      profile_picture:
        "https://cloud.appwrite.io/v1/storage/buckets/647b1c6ae295c58a0e28/files/647dc88844e94146b001/view?project=6478aea4673696da5214",
    })
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
