import { ApolloQueryResult } from '@apollo/client';

import { env } from '@/core/env';
import { getClient } from '@/graphql/utils/getClient';

import { CitySearchStatusDocument, CitySearchStatusQuery } from './queries';

export const getCitySearchStatus = async (): Promise<ApolloQueryResult<CitySearchStatusQuery>> => {
  const data = await getClient().query({
    query: CitySearchStatusDocument,
    context: {
      fetchOptions: {
        next: {
          revalidate: env.NEXT_PUBLIC_FEATURE_CACHE_SECONDS_TIME,
        },
      },
    },
  });

  return data;
};
