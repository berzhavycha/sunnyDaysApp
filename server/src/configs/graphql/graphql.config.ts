import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { GqlOptionsFactory, GqlModuleAsyncOptions } from '@nestjs/graphql';
import { Request, Response } from 'express-serve-static-core';

class GraphQLConfig implements GqlOptionsFactory {
  public createGqlOptions(): ApolloDriverConfig {
    return {
      driver: ApolloDriver,
      playground: {
        settings: {
          "request.credentials": "include",
        }
      },
      context: ({ req, res }): { req: Request, res: Response } => ({
        req,
        res,
      }),
      path: '/api/graphql',
      autoSchemaFile: 'src/graphql/schema.gql',
      sortSchema: true,
      introspection: true,
    };
  }
}

export const graphqlConfigAsync: GqlModuleAsyncOptions = {
  imports: [ConfigModule],
  driver: ApolloDriver,
  useClass: GraphQLConfig,
};
