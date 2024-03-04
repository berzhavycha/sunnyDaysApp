import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order, upperCaseEveryFirstLetter } from '@shared';
import { CitiesService } from '@modules/cities';
import { Subscription } from './entities';
import { DEFAULT_ORDER, DEFAULT_ORDER_COLUMN } from './constants';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    private readonly citiesService: CitiesService,
  ) {}

  async createSubscription(
    cityName: string,
    userId: string,
  ): Promise<Subscription> {
    const city = await this.citiesService.createCity(cityName);

    const existingSubscription = await this.subscriptionRepository.findOne({
      where: { cityId: city.id, userId },
    });

    if (existingSubscription) {
      throw new BadRequestException(
        `You already has a subscription for ${upperCaseEveryFirstLetter(
          city.name,
        )}`,
      );
    }

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
    await this.subscriptionRepository.delete({ id: subscription.id });
    return subscription;
  }

  async getSubscriptionsByUserId(
    userId: string,
    order: Order = DEFAULT_ORDER,
    orderColumn: string = DEFAULT_ORDER_COLUMN,
  ): Promise<Subscription[]> {
    return this.subscriptionRepository.find({
      where: { userId },
      relations: ['city'],
      order: {
        [orderColumn]: order,
      },
    });
  }

  async getPaginatedSubscriptionsByUserId(
    userId: string,
    take: number,
    skip: number,
    order: Order = DEFAULT_ORDER,
    orderColumn: string = DEFAULT_ORDER_COLUMN,
  ): Promise<Subscription[]> {
    return this.subscriptionRepository.find({
      where: { userId },
      relations: ['city'],
      take,
      skip,
      order: {
        [orderColumn]: order,
      },
    });
  }
}
