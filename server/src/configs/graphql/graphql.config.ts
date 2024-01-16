import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { GqlOptionsFactory, GqlModuleAsyncOptions } from '@nestjs/graphql';
import { IContext } from './context.interface';

class GraphQLConfig implements GqlOptionsFactory {
  public createGqlOptions(): ApolloDriverConfig {
    return {
      driver: ApolloDriver,
      context: ({ req, res }): IContext => ({
        req,
        res,
      }),
      path: '/api/graphql',
      autoSchemaFile: 'src/configs/graphql/schema.gql',
      sortSchema: true,
      introspection: true,
    };
  }
}

export const graphqlConfigAsync = {
  imports: [ConfigModule],
  driver: ApolloDriver,
  useClass: GraphQLConfig,
} as GqlModuleAsyncOptions;