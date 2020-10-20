import { Injectable, NotFoundException } from '@nestjs/common'
import { Task } from './task.entity'
import { CreateTaskDto } from './dto/create-task.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { TaskRepository } from './task.repository'
import { TaskStatus } from './interfaces/task-status.enum'
import { UpdateTaskDto } from './dto/update-task.dto'
import { FilterTaskDto } from './dto/filter-task.dto'

@Injectable()
export class TasksService {
    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {}

    async getTasks(filterDto: FilterTaskDto): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto)
    }

    async getTaskById(id: number): Promise<Task> {
        const task = await this.taskRepository.findOne(id)
        if (!task) throw new NotFoundException('Task not found')

        return task
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto)
    }

    async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
        const task = await this.getTaskById(id)
        task.title = updateTaskDto.title
        task.description = updateTaskDto.description
        await task.save()
        return task
    }

    async updateStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id)
        task.status = status
        await task.save()
        return task
    }

    async delete(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id)

        if (result.affected === 0) throw new NotFoundException('Task not found')
    }
}
