import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

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

  @Field(() => Float)
  precip: number;

  @Field(() => Float)
  windSpeed: number;

  @Field(() => String)
  time: string;

  @Field(() => [WeatherDay])
  daysForecast: WeatherDay[];
}
