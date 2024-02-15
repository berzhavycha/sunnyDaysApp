import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserPayload {
  @Field(() => String)
  email: string;
}
