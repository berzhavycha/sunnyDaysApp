import { ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ObjectType('TokensType')
export abstract class TokensType {
  @IsString()
  public accessToken: string;

  @IsString()
  public refreshToken: string;
}
