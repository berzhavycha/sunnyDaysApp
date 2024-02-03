import { IsString } from 'class-validator';

export abstract class TokensType {
  @IsString()
  public accessToken: string;

  @IsString()
  public refreshToken: string;
}
