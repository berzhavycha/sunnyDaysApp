import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('TokensType')
export abstract class TokensType {
  @Field(() => String)
  public accessToken: string;

  @Field(() => String)
  public refreshToken: string;
}
