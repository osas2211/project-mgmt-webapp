import { Client } from "node-appwrite"
export const client = new Client()

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6463da5b176aab1a02e1")
  .setKey(process.env.API_KEY)

import express from "express"
import dotenv from "dotenv"
import colors from "colors"
import cors from "cors"
import userRouter from "./features/users/routes/index.js"
dotenv.config()

colors.enable()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use("/api/v1/user", userRouter)

app.listen(process.env.PORT, async () => {
  console.log(`Server is running on port ${process.env.PORT}`.green)
  try {
  } catch (error) {
    console.log(`${error}`.bgRed.white)
  }
})
