import { Query, Resolver } from '@nestjs/graphql';

import { Public } from '@modules/auth';

import { FeaturesService } from './features.service';

@Resolver()
export class FeaturesResolver {
  constructor(private readonly featuresService: FeaturesService) {}

  @Public()
  @Query(() => Boolean, { name: 'citySearchStatus' })
  async getCitySearchStatus(): Promise<boolean> {
    return this.featuresService.getFeatureStatus('isCitySearchEnabled');
  }
}
