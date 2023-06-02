import { Router } from "express"
const taskRouter = Router()
import { createTask } from "../controllers/index.js"

taskRouter.post("/addTask", createTask)

export default taskRouter
