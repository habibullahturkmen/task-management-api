import { Router } from "express"

import { taskController } from "./tasks.controller"
import { createValidator } from "./tasks.validator"

// initiate the router function
export const tasksRouter: Router = Router()

// get all tasks
tasksRouter.get("/tasks", taskController.getAll)

// post a task
tasksRouter.post("/tasks", createValidator, taskController.create)
