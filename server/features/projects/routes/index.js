import { Router } from "express"
import { createProject } from "../controllers/index.js"

const projectRouter = Router()
projectRouter.post("/createProject", createProject)

export default projectRouter
