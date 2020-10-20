import { Injectable, NotFoundException } from '@nestjs/common'
import { Task } from './task.entity'
import { CreateTaskDto } from './dto/create-task.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { TaskRepository } from './task.repository'
import { TaskStatus } from './interfaces/task-status.enum'

@Injectable()
export class TasksService {
    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {}

    async getTaskById(id: number): Promise<Task> {
        const task = await this.taskRepository.findOne(id)
        if (!task) throw new NotFoundException('Task not found')

        return task
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto

        const task = new Task()
        task.title = title
        task.description = description
        task.status = TaskStatus.OPEN
        await task.save()

        return task
    }

    // findAll(): Task[] {
    //     return this.tasks
    // }
    //
    // getTasksWithFilters(filterDto: FilterTaskDto): Task[] {
    //     const { status, search } = filterDto
    //
    //     let tasks = this.findAll()
    //
    //     if (status) tasks = tasks.filter((task) => task.status === status)
    //     if (search)
    //         tasks = tasks.filter(
    //             (task) => task.title.includes(search) || task.description.includes(search),
    //         )
    //
    //     return tasks
    // }
    //
    // findOne(id: string): Task {
    //     const task = this.tasks.find((task) => task.id === id)
    //
    //     if (!task) throw new NotFoundException('Task not found')
    //
    //     return task
    // }
    //
    // create(createTaskDto: CreateTaskDto): Task {
    //     const id = Math.floor(Math.random() * 1000000).toString()
    //
    //     const task = {
    //         ...createTaskDto,
    //         id,
    //         status: TaskStatus.OPEN,
    //     }
    //
    //     this.tasks.push(task)
    //     return task
    // }
    //
    // update(id: string, updateTaskDto: UpdateTaskDto): Task {
    //     const task = this.findOne(id)
    //     task.title = updateTaskDto.title
    //     task.description = updateTaskDto.description
    //     return task
    // }
    //
    // updateStatus(id: string, status: TaskStatus): Task {
    //     const task = this.findOne(id)
    //     task.status = status
    //     return task
    // }
    //
    // delete(id: string): Task {
    //     const deletedTask = this.tasks.find((task) => task.id === id)
    //     this.tasks = this.tasks.filter((task) => task.id !== id)
    //     return deletedTask
    // }
}
