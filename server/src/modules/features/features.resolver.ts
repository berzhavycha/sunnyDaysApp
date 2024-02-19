import { Resolver, Query } from '@nestjs/graphql';
import { FeaturesService } from './features.service';
import { Public } from '@modules/auth';

@Resolver()
export class FeaturesResolver {
    constructor(private readonly featuresService: FeaturesService) { }

    @Public()
    @Query(() => Boolean, { name: 'citySearchStatus' })
    async getCitySearchStatus(): Promise<boolean> {
        return this.featuresService.getFeatureStatus('isCitySearchEnabled')
    }
}
