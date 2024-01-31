import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities';
import { IUser } from '@modules/users';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) {}

  async createSubscription(
    cityName: string,
    user: IUser,
  ): Promise<Subscription> {
    const subscriptionEntity = this.subscriptionRepository.create({
      cityName,
      userId: user.id,
    });
    return this.subscriptionRepository.save(subscriptionEntity);
  }

  async deleteSubscription(
    cityName: string,
    user: IUser,
  ): Promise<DeleteResult> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { cityName, userId: user.id },
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
