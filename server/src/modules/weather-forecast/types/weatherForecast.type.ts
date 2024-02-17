import { ObjectType, Field, Float, Int, ID } from '@nestjs/graphql';

import { WeatherDay } from './weatherDay.type';

@ObjectType()
export class WeatherForecast {
  @Field(() => ID)
  id: string;
  
  @Field(() => String)
  city: string;

  @Field(() => Float)
  tempCelsius: number;

  @Field(() => Float)
  tempFahrenheit: number;

  @Field(() => String)
  text: string;

  @Field(() => Int)
  humidity: number;

  @Field(() => [WeatherDay])
  daysForecast: WeatherDay[];
}
