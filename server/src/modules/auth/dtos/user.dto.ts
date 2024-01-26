import { PASSWORD_MIN_LENGTH } from '@global';
import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType('UserInput')
export class UserDto {
  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(PASSWORD_MIN_LENGTH)
  readonly password: string;
}
