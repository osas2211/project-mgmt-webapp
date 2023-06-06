import { Router } from "express"
import {
  addCollaborator,
  createProject,
  delA,
  getProject,
  getProjects,
} from "../controllers/index.js"

const projectRouter = Router()
projectRouter.post("/createProject", createProject)
projectRouter.post("/addCollaborator", addCollaborator)
projectRouter.get("/projects", getProjects)
projectRouter.get("/:id", getProject)
projectRouter.post("/del", delA)

export default projectRouter
