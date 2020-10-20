import { BadRequestException, PipeTransform } from '@nestjs/common'
import { TaskStatus } from '../interfaces/task.interface'

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = Object.values(TaskStatus)

    transform(value: any): TaskStatus {
        value = value.toUpperCase()

        if (!this.isValid(value)) throw new BadRequestException('Invalid status')

        return value
    }
    private isValid(status: any) {
        const idx = this.allowedStatuses.indexOf(status)
        return idx !== -1
    }
}
