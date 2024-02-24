import { ObjectType, Field, Float, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class WeatherDay {
  @Field(() => ID)
  id: string;

  @Field(() => Float)
  celsius: number;

  @Field(() => Float)
  fahrenheit: number;

  @Field(() => String)
  text: string;

  @Field(() => Int)
  humidity: number;

  @Field(() => String)
  dayOfWeek: string;
}
