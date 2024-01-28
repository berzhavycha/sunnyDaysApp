import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType('RefreshTokenInput')
export class RefreshTokenDto {
  @Field(() => String)
  @IsNotEmpty()
  refreshToken: string;
}
