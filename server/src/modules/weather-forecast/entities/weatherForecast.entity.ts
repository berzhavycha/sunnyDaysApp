import { ObjectType, Field, Float, Int } from '@nestjs/graphql';
import { WeatherDay } from './weatherDay.entity';

@ObjectType()
export class WeatherForecast {
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
