import { TaskStatus } from '../interfaces/task.interface'

export class UpdateTaskDto {
    title: string
    description: string
    status: TaskStatus
}
