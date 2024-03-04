import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty } from 'class-validator';

import { PaginationArgs } from '@shared';

@ArgsType()
export class ForecastParamArgsDto extends PaginationArgs {
  @Field(() => Int!)
  @IsNotEmpty()
  @IsInt()
  forecastDaysAmount: number;
}
