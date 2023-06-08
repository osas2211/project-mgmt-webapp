import { Router } from "express"
import {
  addCollaborator,
  createProject,
  delA,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from "../controllers/index.js"

const projectRouter = Router()
projectRouter.post("/createProject", createProject)
projectRouter.post("/addCollaborator", addCollaborator)
projectRouter.get("/projects", getProjects)
projectRouter.get("/:id", getProject)
projectRouter.patch("/:id", updateProject)
projectRouter.delete("/:id", deleteProject)
// projectRouter.post("/del", delA)

export default projectRouter
