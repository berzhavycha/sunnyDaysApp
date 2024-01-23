import { Module } from '@nestjs/common';
import { WeatherForecastService } from './weather-forecast.service';
import { WeatherForecastResolver } from './weather-forecast.resolver';
import { SubscriptionsModule } from '@subscriptions';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [SubscriptionsModule, HttpModule],
  providers: [WeatherForecastService, WeatherForecastResolver]
})
export class WeatherForecastModule {}
