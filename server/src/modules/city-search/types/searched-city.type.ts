import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SearchedCity {
  @Field(() => String)
  name: string;

  @Field(() => String)
  country: string;
}
