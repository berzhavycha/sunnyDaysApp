import { Args, Query, Resolver } from '@nestjs/graphql';

import { Public } from '@modules/auth';
import { CitySearchService } from './citySearch.service';
import { SearchedCity } from './types';
import { CityPrefixArgsDto } from './dtos';

@Resolver()
export class CitySearchResolver {
  constructor(private readonly geodbService: CitySearchService) { }

  @Public()
  @Query(() => [SearchedCity]!, { name: 'citiesByPrefix' })
  async getCitiesByPrefix(
    @Args() cityPrefixArgs: CityPrefixArgsDto,
  ): Promise<SearchedCity[]> {
    return this.geodbService.getCitiesByPrefix(cityPrefixArgs);
  }
}
