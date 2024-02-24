import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty } from 'class-validator';

@ArgsType()
export class ForecastParamArgsDto {
  @Field(() => Int!)
  @IsNotEmpty()
  @IsInt()
  citiesLimit: number;

  @Field(() => Int!)
  @IsNotEmpty()
  @IsInt()
  forecastDaysAmount: number;
}
