import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities';
import { CitiesService } from '@modules/cities/cities.service';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    private readonly citiesService: CitiesService
  ) { }

  async createSubscription(
    cityName: string,
    userId: string,
  ): Promise<Subscription> {
    let city = await this.citiesService.findByName(cityName);

    if (!city) {
      city = await this.citiesService.createCity(cityName);
    }

    const subscriptionEntity = this.subscriptionRepository.create({
      cityId: city.id,
      userId
    });
    return this.subscriptionRepository.save(subscriptionEntity);
  }

  async deleteSubscription(
    cityName: string,
    userId: string,
  ): Promise<DeleteResult> {
    const city = await this.citiesService.findByName(cityName);

    const subscription = await this.subscriptionRepository.findOne({
      where: { cityId: city.id, userId },
    });
    return this.subscriptionRepository.delete(subscription);
  }

  async getSubscriptionsByUserId(
    userId: string,
    limit: number,
  ): Promise<Subscription[]> {
    return this.subscriptionRepository.find({ where: { userId }, take: limit });
  }
}
