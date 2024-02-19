import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as configcat from 'configcat-node';

@Injectable()
export class FeaturesService {
  private readonly configcatClient: configcat.IConfigCatClient;

  constructor(private readonly configService: ConfigService) {
    this.configcatClient = configcat.getClient(
      this.configService.get<string>('FEATURES_MANAGER_KEY'),
    );
  }

  async getFeatureStatus(name: string): Promise<boolean> {
    return this.configcatClient.getValueAsync(name, false);
  }
}
