import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { CitySearchService } from './city-search.service';
import { CitySearchResolver } from './city-search.resolver';
import { CitySearchRepository } from './city-search.repository';

@Module({
  imports: [HttpModule],
  providers: [CitySearchService, CitySearchResolver, CitySearchRepository],
})
export class CitySearchModule {}
