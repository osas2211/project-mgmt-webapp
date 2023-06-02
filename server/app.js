import express from "express"
import dotenv from "dotenv"
import colors from "colors"
import cors from "cors"
import userRouter from "./features/users/routes/index.js"
import taskRouter from "./features/tasks/routes/index.js"
dotenv.config()

colors.enable()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use("/api/v1/user", userRouter)
app.use("/api/v1/task", taskRouter)

app.listen(process.env.PORT, async () => {
  console.log(`Server is running on port ${process.env.PORT}`.green)
  try {
  } catch (error) {
    console.log(`${error}`.bgRed.white)
  }
})
