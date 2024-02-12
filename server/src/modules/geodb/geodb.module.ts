import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { GeodbService } from './geodb.service';
import { GeodbResolver } from './geodb.resolver';
import { GeodbRepository } from './geodb.repository';


@Module({
  imports: [
    HttpModule,
  ],
  providers: [GeodbService, GeodbResolver, GeodbRepository]
})
export class GeodbModule {}
