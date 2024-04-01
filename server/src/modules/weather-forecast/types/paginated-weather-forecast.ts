import { ObjectType } from '@nestjs/graphql';

import { Paginated } from '@shared';

import { WeatherForecast } from './weather-forecast.type';

@ObjectType()
export class PaginatedWeatherForecast extends Paginated(WeatherForecast) {}
