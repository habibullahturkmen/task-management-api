import { Router, Request, Response } from "express"

// initiate the router function
export const tasksRouter: Router = Router()

// create a default route
tasksRouter.get("/tasks", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server Running")
})

