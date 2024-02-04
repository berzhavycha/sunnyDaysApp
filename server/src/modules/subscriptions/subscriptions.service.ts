import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) { }

  async createSubscription(
    cityName: string,
    userId: string,
  ): Promise<Subscription> {
    const subscriptionEntity = this.subscriptionRepository.create({
      cityName,
      userId
    });
    return this.subscriptionRepository.save(subscriptionEntity);
  }

  async deleteSubscription(
    cityName: string,
    userId: string,
  ): Promise<DeleteResult> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { cityName, userId },
    });
    return this.subscriptionRepository.delete(subscription.id);
  }

  async getSubscriptionsByUserId(
    userId: string,
    limit: number,
  ): Promise<Subscription[]> {
    return this.subscriptionRepository.find({ where: { userId }, take: limit });
  }
}
