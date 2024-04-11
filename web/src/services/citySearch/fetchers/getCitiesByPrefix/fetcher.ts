import { ApolloQueryResult } from '@apollo/client';

import { env } from '@/core/env';
import { getClient } from '@/graphql/utils/getClient';

import { CitiesDocument, CitiesQuery } from './queries';

// GitHub issue - https://github.com/vercel/next.js/issues/49757#issuecomment-1894910792
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { headers } = require('next/headers');

export const getCitiesByPrefix = async (): Promise<ApolloQueryResult<CitiesQuery>> => {
  // const url = new URL(headers().get('x-url'));
  // const searchParams = url.searchParams;

  // const city = searchParams.get('citySearch') ?? '';

  const data = await getClient().query({
    query: CitiesDocument,
    variables: {
      prefix: 'lv',
      limit: env.NEXT_PUBLIC_CITIES_SEARCH_LIMIT,
      sort: env.NEXT_PUBLIC_CITIES_SEARCH_SORT,
      minPopulation: env.NEXT_PUBLIC_CITIES_SEARCH_MIN_POPULATION,
      offset: env.NEXT_PUBLIC_CITIES_SEARCH_OFFSET,
    },
  });

  return data;
};
