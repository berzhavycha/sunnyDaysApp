import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Subscription } from './entities';
import { CurrentUser } from '@modules/auth';
import { SubscriptionsService } from './subscriptions.service';
import { DeleteResult } from 'typeorm';
import { CityDto } from './dtos/cityInput.dto';

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
  ): Promise<DeleteResult> {
    return this.subscriptionService.deleteSubscription(cityDto.name, id);
  }
}
