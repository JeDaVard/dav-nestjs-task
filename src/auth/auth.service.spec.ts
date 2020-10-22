import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UserRepository } from './user.repository'

const mockUserRepository = () => ({})

describe('AuthService', () => {
    let service: AuthService
    let userRepository

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, { provide: UserRepository, useFactory: mockUserRepository }],
        }).compile()

        service = module.get<AuthService>(AuthService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
