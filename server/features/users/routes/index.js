import { Router } from "express"
const userRouter = Router()
import { createUser } from "../controllers/index.js"

userRouter.post("/signup", createUser)

export default userRouter
