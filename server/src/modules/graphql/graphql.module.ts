import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { graphqlConfigAsync } from './configs';

@Module({
  imports: [GraphQLModule.forRootAsync(graphqlConfigAsync)],
  exports: [GraphQLModule],
})
export class GraphqlModule {}
