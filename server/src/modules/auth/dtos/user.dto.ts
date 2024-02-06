import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType('Credentials')
export class UserDto {
  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(+process.env.PASSWORD_MIN_LENGTH)
  readonly password: string;
}
