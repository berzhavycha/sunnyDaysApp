import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class CityPrefixArgsDto {
  @Field(() => String!)
  @IsNotEmpty()
  prefix: string;

  @Field(() => String!)
  @IsNotEmpty()
  sort: string;

  @Field(() => Int!)
  @IsNotEmpty()
  offset: number;

  @Field(() => Int!)
  @IsNotEmpty()
  limit: number;
}
