import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

@InputType('userDto')
export class UserDto {
    @Field(() => String)
    @IsNotEmpty()
    @IsEmail()
    readonly email: string

    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    readonly password: string
}