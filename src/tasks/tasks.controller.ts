import { instanceToPlain } from "class-transformer"

import { AppDataSource } from "../../index"
import { Task } from "./tasks.entity"

export class TasksController {
  constructor(private taskRepository = AppDataSource.getRepository(Task)) {
  }

  // @ts-ignore
  public async getAll(): Promise<Task[]> {
    let allTasks: Task[]

    // fetch all tasks using the repository
    try {
      allTasks = await this.taskRepository.find({
        order: {
          date: "ASC",
        },
      })

      // convert the tasks instance to an array of objects
      allTasks = instanceToPlain(allTasks) as Task[]

      return allTasks
    } catch (e) {
      console.log(e)
    }
  }
}