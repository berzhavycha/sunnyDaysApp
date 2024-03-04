import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PaginationInfo {
  @Field(() => Int)
  totalCount: number;
}
