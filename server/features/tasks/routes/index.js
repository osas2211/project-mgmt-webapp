import { Router } from "express"
const taskRouter = Router()
import { createTask, getTasks } from "../controllers/index.js"

taskRouter.post("/addTask", createTask)
taskRouter.get("/tasks", getTasks)

export default taskRouter
