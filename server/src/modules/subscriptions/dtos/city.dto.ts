import { Optional } from '@nestjs/common';
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType('CityInput')
export class CityDto {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @Field(() => Int)
  @Optional()
  @IsInt()
  readonly forecastDaysAmount: number;
}
