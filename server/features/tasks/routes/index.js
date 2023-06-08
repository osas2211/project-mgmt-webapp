import { Router } from "express"
const taskRouter = Router()
import {
  createTask,
  deleteTask,
  getTasks,
  getUserTasks,
  updateTask,
} from "../controllers/index.js"

taskRouter.post("/addTask", createTask)
taskRouter.get("/tasks", getTasks)
taskRouter.get("/userTasks", getUserTasks)
taskRouter.delete("/delete/:id", deleteTask)
taskRouter.patch("/update/:id", updateTask)

export default taskRouter
