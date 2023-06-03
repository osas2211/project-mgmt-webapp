import { Router } from "express"
import { createProject, getProjects } from "../controllers/index.js"

const projectRouter = Router()
projectRouter.post("/createProject", createProject)
projectRouter.get("/projects", getProjects)

export default projectRouter
