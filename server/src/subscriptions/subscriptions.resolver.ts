import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Subscription } from './entities';
import { CurrentUser } from '@auth';
import { User } from '@users';
import { SubscriptionsService } from './subscriptions.service';

@Resolver()
export class SubscriptionsResolver {
    constructor(private readonly subscriptionService: SubscriptionsService) { }

    @Mutation(() => Subscription)
    async addWeatherSubscriptions(
        @Args('city') city: string,
        @CurrentUser() user: User
    ) {
        return this.subscriptionService.createSubscription(city, user)
    }

    async getUserSubscriptions(
        @Args('limit') limit: number,
        @CurrentUser() user: User
    ) {
        return this.subscriptionService.getSubscriptionsByUserId(user.userId, limit)
    }
}
