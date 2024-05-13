import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GqlModuleAsyncOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { NODE_ENV } from '@shared';
import { Request, Response } from 'express-serve-static-core';

class GraphQLConfig implements GqlOptionsFactory {
  constructor(private configService: ConfigService) { }

  createGqlOptions(): ApolloDriverConfig {
    const isProduction = this.configService.get<string>('NODE_ENV') === NODE_ENV.production;

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
  }
}

export const graphqlConfigAsync: GqlModuleAsyncOptions = {
  imports: [ConfigModule],
  driver: ApolloDriver,
  useClass: GraphQLConfig,
  inject: [ConfigService], 
};
