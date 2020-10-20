import { Injectable } from '@nestjs/common'
import { Task, TaskStatus } from './interfaces/task.interface'

@Injectable()
export class TasksService {
    private tasks: Task[] = []

    findAll(): Task[] {
        return this.tasks
    }
    findOne(id: string): Task {
        return this.tasks.find((task) => task.id === id)
    }
    create(params): Task {
        const id = Math.floor(Math.random() * 1000000).toString()

        const task = {
            id,
            title: params.title,
            description: params.description,
            status: TaskStatus.OPEN,
        }
        this.tasks.push(task)
        return task
    }
    delete(id: string): Task {
        const deletedTask = this.tasks.find((task) => task.id === id)
        this.tasks.filter((task) => task.id === id)
        return deletedTask
    }
}
