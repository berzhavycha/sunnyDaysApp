import { Module } from '@nestjs/common';
import { GeodbService } from './geodb.service';
import { GeodbResolver } from './geodb.resolver';
import { GeodbRepository } from './geodb.repository';

import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
  ],
  providers: [GeodbService, GeodbResolver, GeodbRepository]
})
export class GeodbModule {}
