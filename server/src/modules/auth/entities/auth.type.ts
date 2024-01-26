import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('AuthResponse')
export abstract class AuthType {
  @Field(() => String)
  public accessToken: string;

  @Field(() => String)
  public refreshToken: string;
}
