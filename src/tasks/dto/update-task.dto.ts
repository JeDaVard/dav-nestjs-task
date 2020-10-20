import { TaskStatus } from '../interfaces/task-status.enum'

export class UpdateTaskDto {
    title: string
    description: string
    status: TaskStatus
}
