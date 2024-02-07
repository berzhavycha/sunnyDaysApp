import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { SubscriptionsModule } from '@modules/subscriptions';
import { CitiesModule } from '@modules/cities';
import { WeatherForecastService } from './weather-forecast.service';
import { WeatherForecastResolver } from './weather-forecast.resolver';
import { WeatherApiRepository } from './weather-forecast.repository';

@Module({
  imports: [SubscriptionsModule, CitiesModule, HttpModule],
  providers: [
    WeatherForecastService,
    WeatherForecastResolver,
    WeatherApiRepository,
  ],
})
export class WeatherForecastModule {}
