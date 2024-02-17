import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { DeleteResult } from 'typeorm';

import { CurrentUser } from '@modules/auth/decorators';
import { SubscriptionsService } from './subscriptions.service';
import { Subscription } from './entities';
import { CityDto } from './dtos';

@Resolver()
export class SubscriptionsResolver {
  constructor(private readonly subscriptionService: SubscriptionsService) {}

  @Mutation(() => Subscription)
  async addWeatherSubscription(
    @Args('input') cityDto: CityDto,
    @CurrentUser('id') id: string,
  ): Promise<Subscription> {
    return this.subscriptionService.createSubscription(cityDto.name, id);
  }

  @Mutation(() => Subscription)
  async deleteWeatherSubscription(
    @Args('input') cityDto: CityDto,
    @CurrentUser('id') id: string,
  ): Promise<Subscription> {
    return this.subscriptionService.deleteSubscription(cityDto.name, id);
  }
}
