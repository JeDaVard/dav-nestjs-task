import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Patch,
    Query,
    UsePipes,
    ValidationPipe,
    ParseIntPipe,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { Task } from './task.entity'
import { FilterTaskDto } from './dto/filter-task.dto'
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe'
import { TaskStatus } from './interfaces/task-status.enum'

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    async getTasks(@Query(ValidationPipe) filterDto: FilterTaskDto): Promise<Task[]> {
        return this.taskService.getTasks(filterDto)
    }

    @Get(':id')
    async getATasks(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.taskService.getTaskById(id)
    }

    @Delete(':id')
    async deleteATask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.taskService.delete(id)
    }

    @Patch(':id')
    updateTask(@Param('id', ValidationPipe) id: number, @Body() updateTaskDto: UpdateTaskDto) {
        return this.taskService.update(id, updateTaskDto)
    }

    @Patch(':id/status')
    updateTaskStatus(
        @Param('id', ValidationPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    ) {
        return this.taskService.updateStatus(id, status)
    }

    @Post()
    @UsePipes(ValidationPipe)
    // @HttpCode(HttpStatus.CREATED)
    async createATask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskService.createTask(createTaskDto)
    }
}
