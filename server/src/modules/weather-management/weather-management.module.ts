import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { WeatherManagementRepository } from './weather-management.repository';
import { WeatherManagementService } from './weather-management.service';

@Module({
  imports: [HttpModule],
  providers: [WeatherManagementService, WeatherManagementRepository],
  exports: [WeatherManagementService, WeatherManagementRepository],
})
export class WeatherManagementModule {}
