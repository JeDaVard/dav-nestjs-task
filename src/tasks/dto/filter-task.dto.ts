import { TaskStatus } from '../interfaces/task.interface'
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator'

export class FilterTaskDto {
    @IsOptional()
    @IsIn(Object.keys(TaskStatus))
    status: TaskStatus

    @IsOptional()
    @IsNotEmpty()
    search: string
}
