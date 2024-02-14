import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class GeodbCity {
  @Field(() => String)
  name: string;
}
