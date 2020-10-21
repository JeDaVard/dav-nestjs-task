import { User } from './user.entity'
import * as bcrypt from 'bcrypt'
import { EntityRepository, Repository } from 'typeorm'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import {
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
} from '@nestjs/common'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    private static async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt)
    }
    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const { username, password } = authCredentialsDto

        const user = new User()
        user.username = username
        await user.hashPassword(password)

        try {
            await user.save()
        } catch (e) {
            if (e.code === '23505') throw new ConflictException('Username taken')
            throw new InternalServerErrorException()
        }

        delete user.password
        delete user.salt

        return user
    }
    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const { username, password } = authCredentialsDto

        const user = await this.findOne({ username })
        if (user && (await user.validatePassword(password))) {
            delete user.password
            delete user.salt

            return user
        }

        throw new BadRequestException('Invalid credentials')
    }
}
