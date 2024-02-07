import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CitiesService } from './cities.service';
import { City } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  providers: [CitiesService],
  exports: [CitiesService],
})
export class CitiesModule {}
