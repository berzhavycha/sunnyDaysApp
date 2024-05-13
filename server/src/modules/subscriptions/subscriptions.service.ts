import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '@shared';

import { CitiesService } from '@modules/cities';

import { DEFAULT_ORDER, DEFAULT_ORDER_COLUMN, subscriptionErrorMessages } from './constants';
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
    forecastDaysAmount: number,
    userId: string,
  ): Promise<Subscription> {
    const city = await this.citiesService.createCity(
      cityName,
      forecastDaysAmount,
    );

    const existingSubscription = await this.subscriptionRepository.findOne({
      where: { cityId: city.id, userId },
    });

    if (existingSubscription) {
      throw new BadRequestException(
        subscriptionErrorMessages.subscriptionExists(city.name),
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
    const subscription = await this.subscriptionRepository.findOne({
      where: { city: { name: cityName.toLowerCase() }, userId },
      relations: ['city'],
    });

    if (!subscription) {
      throw new NotFoundException(
        subscriptionErrorMessages.subscriptionNotFound(cityName),
      );
    }

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

  async getPaginatedSubscriptionsByUserId(options: {
    userId: string;
    take: number;
    skip: number;
    order?: Order;
    orderColumn?: string;
  }): Promise<Subscription[]> {
    const {
      userId,
      take,
      skip,
      order = DEFAULT_ORDER,
      orderColumn = DEFAULT_ORDER_COLUMN,
    } = options;

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
