import { ApolloDriver } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GqlModuleAsyncOptions } from '@nestjs/graphql';
import { Request, Response } from 'express-serve-static-core';

import { NODE_ENV } from '@shared';

export const graphqlConfigAsync: GqlModuleAsyncOptions = {
  imports: [ConfigModule],
  driver: ApolloDriver,
  useFactory: (configService: ConfigService) => {
    const isProduction =
      configService.get<string>('NODE_ENV') === NODE_ENV.production;

    return {
      driver: ApolloDriver,
      context: ({ req, res }): { req: Request; res: Response } => ({
        req,
        res,
      }),
      path: '/api',
      autoSchemaFile: 'src/modules/graphql/schema.gql',
      sortSchema: true,
      introspection: !isProduction,
    };
  },
  inject: [ConfigService],
};
