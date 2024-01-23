import { ObjectType, Field, Float, Int } from '@nestjs/graphql';

@ObjectType()
export class WeatherDay {
    @Field(() => Float)
    tempCelsius: number

    @Field(() => Float)
    tempFahrenheit: number

    @Field(() => String)
    text: string;

    @Field(() => Int)
    humidity: number;
}