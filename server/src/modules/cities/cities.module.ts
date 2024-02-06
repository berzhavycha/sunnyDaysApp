import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { City } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  providers: [CitiesService],
  exports: [CitiesService]
})
export class CitiesModule {}
