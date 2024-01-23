import { Injectable } from '@nestjs/common';
import { CitiesService } from '@cities';
import { User } from '@users';
import { Subscription } from './entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SubscriptionsService {
    constructor(
        @InjectRepository(Subscription) private readonly subscriptionRepository: Repository<Subscription>,
        private readonly citiesService: CitiesService,
    ) { }

    async createSubscription(city: string, user: User) {
        const cityEntity = await this.citiesService.createCityEntity(city)
        const subscriptionEntity = this.subscriptionRepository.create({ cityId: cityEntity.cityId, userId: user.userId })
        return this.subscriptionRepository.save(subscriptionEntity)
    }

    async getSubscriptionsByUserId(userId: string, limit: number) {
        return this.subscriptionRepository.find({ where: { userId }, take: limit })
    }
}
