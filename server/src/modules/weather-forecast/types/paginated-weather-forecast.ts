import { ObjectType } from '@nestjs/graphql';

import { Paginated } from '@shared';

import { WeatherForecast } from '@modules/weather-management';

@ObjectType()
export class PaginatedWeatherForecast extends Paginated(WeatherForecast) {}
