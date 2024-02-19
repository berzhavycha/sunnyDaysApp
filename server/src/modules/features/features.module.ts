import { Module } from '@nestjs/common';

import { FeaturesResolver } from './features.resolver';
import { FeaturesService } from './features.service';

@Module({
  providers: [FeaturesResolver, FeaturesService]
})
export class FeaturesModule { }
