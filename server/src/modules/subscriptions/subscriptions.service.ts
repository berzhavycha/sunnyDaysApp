import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CitiesService } from '@modules/cities';
import { Subscription } from './entities';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    private readonly citiesService: CitiesService,
  ) { }

  async createSubscription(
    cityName: string,
    userId: string,
  ): Promise<Subscription> {
    const city = await this.citiesService.createCity(cityName);

    const subscriptionEntity = this.subscriptionRepository.create({
      cityId: city.id,
      userId,
    });
    return this.subscriptionRepository.save(subscriptionEntity);
  }

  async deleteSubscription(
    cityName: string,
    userId: string,
  ): Promise<Subscription> {
    const city = await this.citiesService.findByName(cityName);

    const subscription = await this.subscriptionRepository.findOne({
      where: { cityId: city.id, userId },
    });
    await this.subscriptionRepository.delete(subscription);
    return subscription;
  }

  async getSubscriptionsByUserId(
    userId: string,
    limit: number,
  ): Promise<Subscription[]> {
    return this.subscriptionRepository.find({
      where: { userId },
      relations: ['city'],
      take: limit,
    });
  }
}
