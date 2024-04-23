import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType('AddCityInput')
export class AddCityDto {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @Field(() => Int)
  @IsInt()
  readonly forecastDaysAmount: number;
}
