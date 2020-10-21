import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from './user.repository'
import { User } from './user.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secret',
        })
    }

    async validate(payload: any): Promise<User> {
        const user = await this.userRepository.findOne(payload.id)
        if (!user) throw new UnauthorizedException()
        delete user.password
        delete user.salt
        return user
    }
}
