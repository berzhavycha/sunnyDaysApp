import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WeatherDay {
  @Field(() => ID)
  id: string;

  @Field(() => Float)
  celsius: number;

  @Field(() => Float)
  fahrenheit: number;

  @Field(() => Float)
  minCelsius: number;

  @Field(() => Float)
  maxCelsius: number;

  @Field(() => Float)
  minFahrenheit: number;

  @Field(() => Float)
  maxFahrenheit: number;

  @Field(() => String)
  text: string;

  @Field(() => Int)
  humidity: number;

  @Field(() => String)
  dayOfWeek: string;

  @Field(() => Float)
  precip: number;

  @Field(() => Float)
  windSpeed: number;
}
