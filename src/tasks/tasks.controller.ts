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

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}
    //
    // @Get()
    // getAllTasks(@Query(ValidationPipe) filterDto: FilterTaskDto): Task[] {
    //     if (Object.keys(filterDto).length) {
    //         return this.taskService.getTasksWithFilters(filterDto)
    //     }
    //     return this.taskService.findAll()
    // }
    //
    @Get(':id')
    async getATasks(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.taskService.getTaskById(id)
    }
    //
    // @Delete(':id')
    // deleteATask(@Param('id') id: string) {
    //     return this.taskService.delete(id)
    // }
    //
    // @Patch(':id')
    // updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    //     return this.taskService.update(id, updateTaskDto)
    // }
    //
    // @Patch(':id/status')
    // updateTaskStatus(
    //     @Param('id') id: string,
    //     @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    // ) {
    //     return this.taskService.updateStatus(id, status)
    // }
    //
    @Post()
    @UsePipes(ValidationPipe)
    // @HttpCode(HttpStatus.CREATED)
    async createATask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskService.createTask(createTaskDto)
    }
}
