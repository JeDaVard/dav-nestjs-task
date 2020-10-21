import { Injectable, NotFoundException } from '@nestjs/common'
import { Task } from './task.entity'
import { CreateTaskDto } from './dto/create-task.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { TaskRepository } from './task.repository'
import { TaskStatus } from './interfaces/task-status.enum'
import { UpdateTaskDto } from './dto/update-task.dto'
import { FilterTaskDto } from './dto/filter-task.dto'
import { User } from '../auth/user.entity'

@Injectable()
export class TasksService {
    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {}

    async getTasks(filterDto: FilterTaskDto, user: User): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto, user)
    }

    async getTaskById(id: number, user: User): Promise<Task> {
        const task = await this.taskRepository.findOne({ where: { id, userId: user.id } })
        if (!task) throw new NotFoundException('Task not found')

        return task
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user)
    }

    async update(id: number, updateTaskDto: UpdateTaskDto, user: User): Promise<Task> {
        const task = await this.getTaskById(id, user)
        task.title = updateTaskDto.title
        task.description = updateTaskDto.description
        await task.save()
        return task
    }

    async updateStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
        const task = await this.getTaskById(id, user)
        task.status = status
        await task.save()
        return task
    }

    async delete(id: number, user: User): Promise<void> {
        const result = await this.taskRepository.delete({ id, userId: user.id })

        if (result.affected === 0) throw new NotFoundException('Task not found')
    }
}
