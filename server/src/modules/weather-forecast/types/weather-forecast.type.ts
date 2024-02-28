import { ObjectType, Field, Float, Int, ID } from '@nestjs/graphql';

import { WeatherDay } from './weather-day.type';

@ObjectType()
export class WeatherForecast {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  city: string;

  @Field(() => Float)
  celsius: number;

  @Field(() => Float)
  fahrenheit: number;

  @Field(() => String)
  text: string;

  @Field(() => Int)
  humidity: number;

  @Field(() => [WeatherDay])
  daysForecast: WeatherDay[];
}