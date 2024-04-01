import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { CitySearchRepository } from './city-search.repository';
import { CitySearchResolver } from './city-search.resolver';
import { CitySearchService } from './city-search.service';

@Module({
  imports: [HttpModule],
  providers: [CitySearchService, CitySearchResolver, CitySearchRepository],
})
export class CitySearchModule {}
