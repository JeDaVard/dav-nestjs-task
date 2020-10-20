import { Injectable } from '@nestjs/common'
import { UserRepository } from './user.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { User } from './user.entity'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto) {
        const user = await this.userRepository.createUser(authCredentialsDto)
        const payload = { id: user.id, username: user.username }
        const accessToken = this.jwtService.sign(payload)
        return { ...user, accessToken }
    }

    async signIn(authCredentialsDto: AuthCredentialsDto) {
        const user = await this.userRepository.signIn(authCredentialsDto)
        const payload = { id: user.id, username: user.username }
        const accessToken = this.jwtService.sign(payload)
        return { ...user, accessToken }
    }
}
