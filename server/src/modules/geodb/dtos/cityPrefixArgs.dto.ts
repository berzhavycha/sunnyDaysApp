import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class CityPrefixArgsDto {
  @Field(() => String!)
  @IsNotEmpty()
  @IsString()
  prefix: string;

  @Field(() => String!)
  @IsNotEmpty()
  @IsString()
  sort: string;

  @Field(() => Int!)
  @IsNotEmpty()
  @IsInt()
  offset: number;

  @Field(() => Int!)
  @IsNotEmpty()
  @IsInt()
  limit: number;
}
