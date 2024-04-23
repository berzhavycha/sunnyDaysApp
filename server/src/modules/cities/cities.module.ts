import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WeatherManagementModule } from '@modules/weather-management';

import { CitiesService } from './cities.service';
import { City } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([City]), WeatherManagementModule],
  providers: [CitiesService],
  exports: [CitiesService],
})
export class CitiesModule {}
