import { graphqlConfigAsync } from './configs';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRootAsync(graphqlConfigAsync),
  ],
  exports: [GraphQLModule],
})
export class GraphqlModule { }
