import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType('ForecastParamsInput')
export class ForecastParamsInput {
  @Field(() => Int!)
  @IsNotEmpty()
  citiesLimit: number;

  @Field(() => Int!)
  @IsNotEmpty()
  forecastDaysAmount: number;
}
