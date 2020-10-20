import { TaskStatus } from '../interfaces/task-status.enum'
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator'

export class FilterTaskDto {
    @IsOptional()
    @IsIn(Object.keys(TaskStatus))
    status: TaskStatus

    @IsOptional()
    @IsNotEmpty()
    search: string
}
