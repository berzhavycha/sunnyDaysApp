import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { CitySearchService } from './citySearch.service';
import { CitySearchResolver } from './citySearch.resolver';
import { CitySearchRepository } from './citySearch.repository';

@Module({
  imports: [HttpModule],
  providers: [CitySearchService, CitySearchResolver, CitySearchRepository],
})
export class CitySearchModule { }
