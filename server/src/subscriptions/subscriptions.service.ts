import { Injectable } from '@nestjs/common';
import { User } from '@users';
import { Subscription } from './entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SubscriptionsService {
    constructor(
        @InjectRepository(Subscription) private readonly subscriptionRepository: Repository<Subscription>,
    ) { }

    async createSubscription(cityName: string, user: User) {
        const subscriptionEntity = this.subscriptionRepository.create({ cityName, userId: user.userId })
        return this.subscriptionRepository.save(subscriptionEntity)
    }

    async deleteSubscription(cityName: string, user: User) {
        const subscription = await this.subscriptionRepository.findOne({ where: { cityName, userId: user.userId } })
        return this.subscriptionRepository.delete(subscription.subscriptionId)
    }

    async getSubscriptionsByUserId(userId: string, limit: number) {
        console.log(userId)
        return this.subscriptionRepository.find({ where: { userId }, take: limit})
    }
}
