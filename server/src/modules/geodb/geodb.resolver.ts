import { Args, Query, Resolver } from '@nestjs/graphql';

import { Public } from '@modules/auth';
import { GeodbService } from './geodb.service';
import { GeodbCity } from './types';
import { CityPrefixArgsDto } from './dtos';

@Resolver()
export class GeodbResolver {
  constructor(private readonly geodbService: GeodbService) { }

  @Public()
  @Query(() => [GeodbCity]!, { name: 'citiesByPrefix' })
  async getCitiesByPrefix(
    @Args() cityPrefixArgs: CityPrefixArgsDto,
  ): Promise<GeodbCity[]> {
    return this.geodbService.getCitiesByPrefix(cityPrefixArgs);
  }
}
