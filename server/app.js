import express from "express"
import dotenv from "dotenv"
import colors from "colors"
import cors from "cors"
import userRouter from "./features/users/routes/index.js"
import taskRouter from "./features/tasks/routes/index.js"
import projectRouter from "./features/projects/routes/index.js"
import { Server } from "http"
import { Server as IO } from "socket.io"
dotenv.config()

colors.enable()
const app = express()
const http = new Server(app)

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// SOCKET.IO
const socketIO = new IO(http, {
  cors: {
    origin: "http://localhost:3000",
  },
})

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`)
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected")
  })
})

// REST - APIS
app.use("/api/v1/user", userRouter)
app.use("/api/v1/task", taskRouter)
app.use("/api/v1/project", projectRouter)

http.listen(process.env.PORT, async () => {
  console.log(`Server is running on port ${process.env.PORT}`.green)
  try {
  } catch (error) {
    console.log(`${error}`.bgRed.white)
  }
})
