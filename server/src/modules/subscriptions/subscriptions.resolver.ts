import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Subscription } from './entities';
import { CurrentUser } from '@modules/auth';
import { SubscriptionsService } from './subscriptions.service';
import { DeleteResult } from 'typeorm';

@Resolver()
export class SubscriptionsResolver {
  constructor(private readonly subscriptionService: SubscriptionsService) {}

  @Mutation(() => Subscription)
  async addWeatherSubscription(
    @Args('city') city: string,
    @CurrentUser('id') id: string,
  ): Promise<Subscription> {
    return this.subscriptionService.createSubscription(city, id);
  }

  @Mutation(() => Subscription)
  async deleteWeatherSubscription(
    @Args('city') city: string,
    @CurrentUser('id') id: string,
  ): Promise<DeleteResult> {
    return this.subscriptionService.deleteSubscription(city, id);
  }
}
