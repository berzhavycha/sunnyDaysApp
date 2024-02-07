import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsResolver } from './subscriptions.resolver';
import { Subscription } from './entities';
import { CitiesModule } from '@modules/cities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription]),
    CitiesModule
  ],
  providers: [SubscriptionsService, SubscriptionsResolver],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
