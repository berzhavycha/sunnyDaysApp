import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType('Credentials')
export class UserDto {
  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
