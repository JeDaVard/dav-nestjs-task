import { Test, TestingModule } from '@nestjs/testing'
import { TasksService } from './tasks.service'
import { TaskRepository } from './task.repository'

const mockTaskRepository = () => ({
    getTasks: jest.fn(),
})

describe('TasksService', () => {
    let service: TasksService
    let taskRepositoryw

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TasksService, { provide: TaskRepository, useFactory: mockTaskRepository }],
        }).compile()

        service = await module.get<TasksService>(TasksService)
        taskRepository = await module.get<TaskRepository>(TaskRepository)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    // it('gets all tasks from the repo', async () => {
    //     expect(taskRepository.getTasks).toHaveBeenCalled()
    // })
})
