import { Module } from '@nestjs/common';
import { SubscriptionsModule } from '@modules/subscriptions';
import { HttpModule } from '@nestjs/axios';
import { WeatherForecastService } from './weather-forecast.service';
import { WeatherForecastResolver } from './weather-forecast.resolver';
import { WeatherApiRepository } from './weather-forecast.repository';
import { CitiesModule } from '@modules/cities/cities.module';

@Module({
  imports: [
    SubscriptionsModule,
    CitiesModule,
    HttpModule
  ],
  providers: [
    WeatherForecastService,
    WeatherForecastResolver,
    WeatherApiRepository,
  ],
})
export class WeatherForecastModule { }
