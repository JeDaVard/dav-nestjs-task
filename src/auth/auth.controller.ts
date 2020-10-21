import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { AuthService } from './auth.service'
import { User } from './user.entity'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from './get-user.decorator'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
        return this.authService.signUp(authCredentialsDto)
    }

    @Post('/signin')
    async signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
        return this.authService.signIn(authCredentialsDto)
    }

    @Get()
    @UseGuards(AuthGuard())
    async test(@GetUser() user: User) {
        return user
    }
}
