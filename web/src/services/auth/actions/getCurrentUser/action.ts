'use server';

import { ApolloQueryResult } from '@apollo/client';

import { getClient } from '@/graphql/utils/getClient';

import { CurrentUserDocument, CurrentUserQuery } from './queries';

export const getCurrentUser = async (): Promise<ApolloQueryResult<CurrentUserQuery>> => {
  return getClient().query({
    query: CurrentUserDocument,
  });
};
