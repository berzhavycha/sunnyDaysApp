import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Subscription } from './entities';
import { CurrentUser } from '@modules/auth';
import { User } from '@modules/users';
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

    @Mutation(() => Subscription)
    async deleteWeatherSubscriptions(
        @Args('city') city: string,
        @CurrentUser() user: User
    ) {
        return this.subscriptionService.deleteSubscription(city, user)
    }
}
