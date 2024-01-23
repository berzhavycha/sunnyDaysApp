import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsResolver } from './subscriptions.resolver';
import { CitiesModule } from '@cities';

@Module({
  imports: [CitiesModule],
  providers: [SubscriptionsService, SubscriptionsResolver],
})
export class SubscriptionsModule { }
