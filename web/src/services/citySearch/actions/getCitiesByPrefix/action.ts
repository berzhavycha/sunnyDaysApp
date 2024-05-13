'use server';

import { getClient } from '@/graphql/utils/getClient';
import { City } from '@/shared';

import { CitiesDocument } from './queries';
import { extractData, getCitiesQueryVariables } from './utils';

export const getCitiesByPrefix = async (city: string): Promise<City[]> => {
  const { data } = await getClient().query({
    query: CitiesDocument,
    variables: getCitiesQueryVariables(city),
  });

  return extractData(data);
};
