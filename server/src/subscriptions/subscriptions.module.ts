import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsResolver } from './subscriptions.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription])],
  providers: [SubscriptionsService, SubscriptionsResolver],
  exports: [SubscriptionsService]
})
export class SubscriptionsModule { }
