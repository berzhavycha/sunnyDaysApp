import { Args, Query, Resolver } from '@nestjs/graphql';

import { Public } from '@modules/auth';

import { CitySearchService } from './city-search.service';
import { CityPrefixArgsDto } from './dtos';
import { SearchedCity } from './types';

@Resolver()
export class CitySearchResolver {
  constructor(private readonly citySearchService: CitySearchService) {}

  @Public()
  @Query(() => [SearchedCity]!, { name: 'citiesByPrefix' })
  async getCitiesByPrefix(
    @Args() cityPrefixArgs: CityPrefixArgsDto,
  ): Promise<SearchedCity[]> {
    return this.citySearchService.getCitiesByPrefix(cityPrefixArgs);
  }
}
