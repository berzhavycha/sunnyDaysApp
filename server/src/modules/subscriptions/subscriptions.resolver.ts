import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CurrentUser } from '@modules/auth/decorators';

import { AddCityDto, DeleteCityDto } from './dtos';
import { Subscription } from './entities';
import { SubscriptionsService } from './subscriptions.service';

@Resolver()
export class SubscriptionsResolver {
  constructor(private readonly subscriptionService: SubscriptionsService) {}

  @Mutation(() => Subscription)
  async addWeatherSubscription(
    @Args('input') cityDto: AddCityDto,
    @CurrentUser('id') id: string,
  ): Promise<Subscription> {
    return this.subscriptionService.createSubscription(
      cityDto.name,
      cityDto.forecastDaysAmount,
      id,
    );
  }

  @Mutation(() => Subscription)
  async deleteWeatherSubscription(
    @Args('input') cityDto: DeleteCityDto,
    @CurrentUser('id') id: string,
  ): Promise<Subscription> {
    return this.subscriptionService.deleteSubscription(cityDto.name, id);
  }
}
