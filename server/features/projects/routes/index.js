import { Router } from "express"
import { createProject, getProject, getProjects } from "../controllers/index.js"

const projectRouter = Router()
projectRouter.post("/createProject", createProject)
projectRouter.get("/projects", getProjects)
projectRouter.get("/:id", getProject)

export default projectRouter
