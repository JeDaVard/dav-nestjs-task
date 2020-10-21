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
    UseGuards,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { Task } from './task.entity'
import { FilterTaskDto } from './dto/filter-task.dto'
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe'
import { TaskStatus } from './interfaces/task-status.enum'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from '../auth/get-user.decorator'
import { User } from '../auth/user.entity'

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    async getTasks(
        @Query(ValidationPipe) filterDto: FilterTaskDto,
        @GetUser() user: User,
    ): Promise<Task[]> {
        return this.taskService.getTasks(filterDto, user)
    }

    @Get(':id')
    async getATask(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Task> {
        return this.taskService.getTaskById(id, user)
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    async deleteATask(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
        return this.taskService.delete(id, user)
    }

    @Patch(':id')
    @UseGuards(AuthGuard())
    updateTask(
        @Param('id', ValidationPipe) id: number,
        @Body() updateTaskDto: UpdateTaskDto,
        @GetUser() user: User,
    ) {
        return this.taskService.update(id, updateTaskDto, user)
    }

    @Patch(':id/status')
    @UseGuards(AuthGuard())
    updateTaskStatus(
        @Param('id', ValidationPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        @GetUser() user: User,
    ) {
        return this.taskService.updateStatus(id, status, user)
    }

    @Post()
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    // @HttpCode(HttpStatus.CREATED)
    async createATask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
        return this.taskService.createTask(createTaskDto, user)
    }
}
