import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlModuleAsyncOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { Request, Response } from 'express-serve-static-core';

class GraphQLConfig implements GqlOptionsFactory {
  createGqlOptions(): ApolloDriverConfig {
    return {
      driver: ApolloDriver,
      context: ({ req, res }): { req: Request; res: Response } => ({
        req,
        res,
      }),
      path: '/api',
      autoSchemaFile: 'src/modules/graphql/schema.gql',
      sortSchema: true,
      introspection: true, 
    };
  }
}

export const graphqlConfigAsync: GqlModuleAsyncOptions = {
  driver: ApolloDriver,
  useClass: GraphQLConfig,
};
