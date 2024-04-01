import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { CitiesModule } from '@modules/cities';
import { SubscriptionsModule } from '@modules/subscriptions';

import { WeatherForecastRepository } from './weather-forecast.repository';
import { WeatherForecastResolver } from './weather-forecast.resolver';
import { WeatherForecastService } from './weather-forecast.service';

@Module({
  imports: [SubscriptionsModule, CitiesModule, HttpModule],
  providers: [
    WeatherForecastService,
    WeatherForecastResolver,
    WeatherForecastRepository,
  ],
})
export class WeatherForecastModule {}
