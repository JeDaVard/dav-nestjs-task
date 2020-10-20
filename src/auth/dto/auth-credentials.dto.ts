import { IsString, MaxLength, MinLength } from 'class-validator'

export class AuthCredentialsDto {
    @IsString()
    @MinLength(3)
    @MaxLength(10)
    username: string

    @IsString()
    @MinLength(2)
    @MaxLength(10)
    password: string
}
