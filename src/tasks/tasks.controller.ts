import { validationResult } from "express-validator"
import { instanceToPlain } from "class-transformer"
import { Request, Response } from "express"

import { AppDataSource } from "../../index"
import { Task } from "./tasks.entity"

class TasksController {
  // method for the get route
  public async getAll(req: Request, res: Response): Promise<Response> {
    let allTasks: Task[]

    // fetch all tasks using the repository
    try {
      allTasks = await AppDataSource.getRepository(Task).find({
        order: {
          date: "ASC",
        },
      })

      // convert the tasks instance to an array of objects
      allTasks = instanceToPlain(allTasks) as Task[]

      return res.json(allTasks).status(200)
    } catch (_err) {
      return res.json({ error: "Internal Server Error" }).status(500)
    }
  }

  // method for the post route
  public async create(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const newTask = new Task()

    newTask.title = req.body.title
    newTask.date = req.body.date
    newTask.description = req.body.description
    newTask.priority = req.body.priority
    newTask.status = req.body.status

    let createdTask: Task

    try {
      createdTask = await AppDataSource.getRepository(Task).save(newTask)
      createdTask = instanceToPlain(createdTask) as Task
      return res.json(createdTask).status(201)
    } catch (_err) {
      return res.json({ error: "Internal Server Error" }).status(500)
    }
  }
}

export const taskController = new TasksController()
