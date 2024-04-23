import { Module } from '@nestjs/common';

import { CitiesModule } from '@modules/cities';
import { SubscriptionsModule } from '@modules/subscriptions';
import { WeatherManagementModule } from '@modules/weather-management';

import { WeatherForecastResolver } from './weather-forecast.resolver';
import { WeatherForecastService } from './weather-forecast.service';

@Module({
  imports: [SubscriptionsModule, CitiesModule, WeatherManagementModule],
  providers: [WeatherForecastService, WeatherForecastResolver],
})
export class WeatherForecastModule {}
