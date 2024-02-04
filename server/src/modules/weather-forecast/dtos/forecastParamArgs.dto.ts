import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class ForecastParamArgs {
  @Field(() => Int!)
  @IsNotEmpty()
  citiesLimit: number;

  @Field(() => Int!)
  @IsNotEmpty()
  forecastDaysAmount: number;
}
