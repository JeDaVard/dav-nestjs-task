import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Res,
    HttpStatus,
} from '@nestjs/common'
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    getAllTasks() {
        return this.taskService.findAll()
    }
    @Get(':id')
    getATasks(@Param() params) {
        return this.taskService.findOne(params.id)
    }
    @Delete(':id')
    deleteATask(@Param('id') id: string) {
        return this.taskService.delete(id)
    }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    createATask(@Body() body, @Res() res) {
        if (!body.title || !body.description)
            return res.status(HttpStatus.BAD_REQUEST).send('Missing params')
        const task = this.taskService.create({ title: body.title, description: body.description })
        res.send(task)
    }
}
