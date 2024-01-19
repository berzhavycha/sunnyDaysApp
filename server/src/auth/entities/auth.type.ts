import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType("Auth")
export abstract class AuthType {
  @Field(() => String)
  public accessToken: string;

  @Field(() => String)
  public refreshToken: string;
}
