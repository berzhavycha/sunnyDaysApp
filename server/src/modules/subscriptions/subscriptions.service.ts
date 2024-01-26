import { Injectable } from '@nestjs/common';
import { User } from '@modules/users';
import { Subscription } from './entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class SubscriptionsService {
    constructor(
        @InjectRepository(Subscription) private readonly subscriptionRepository: Repository<Subscription>,
    ) { }

    async createSubscription(cityName: string, user: User) {
        const subscriptionEntity = this.subscriptionRepository.create({ cityName, userId: user.id })
        return this.subscriptionRepository.save(subscriptionEntity)
    }

    async deleteSubscription(cityName: string, user: User) {
        const subscription = await this.subscriptionRepository.findOne({ where: { cityName, userId: user.id } })
        return this.subscriptionRepository.delete(subscription.id)
    }

    async getSubscriptionsByUserId(userId: string, limit: number) {
        return this.subscriptionRepository.find({ where: { userId }, take: limit })
    }
}
