import { Module } from '@nestjs/common';
import { SubscriptionsModule } from '@modules/subscriptions';
import { HttpModule } from '@nestjs/axios';
import { WeatherForecastService } from './weather-forecast.service';
import { WeatherForecastResolver } from './weather-forecast.resolver';
import { WeatherApiRepository } from './weather-forecast.repository';

@Module({
  imports: [SubscriptionsModule, HttpModule],
  providers: [WeatherForecastService, WeatherForecastResolver, WeatherApiRepository]
})
export class WeatherForecastModule { }
