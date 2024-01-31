import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Subscription } from './entities';
import { CurrentUser } from '@modules/auth';
import { IUser } from '@modules/users';
import { SubscriptionsService } from './subscriptions.service';
import { DeleteResult } from 'typeorm';

@Resolver()
export class SubscriptionsResolver {
    constructor(private readonly subscriptionService: SubscriptionsService) { }

    @Mutation(() => Subscription)
    async addWeatherSubscription(
        @Args('city') city: string,
        @CurrentUser() user: IUser
    ): Promise<Subscription> {
        return this.subscriptionService.createSubscription(city, user)
    }

    @Mutation(() => Subscription)
    async deleteWeatherSubscription(
        @Args('city') city: string,
        @CurrentUser() user: IUser
    ): Promise<DeleteResult> {
        return this.subscriptionService.deleteSubscription(city, user)
    }
}
