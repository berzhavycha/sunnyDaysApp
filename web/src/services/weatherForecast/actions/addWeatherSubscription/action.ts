'use server';

import { ApolloError } from '@apollo/client';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { env } from '@/core/env';
import { getClient } from '@/graphql/utils/getClient';
import { countTotalPages, getPaginationParams } from '@/shared';

import { UserCitiesWeatherQuery } from '../../fetchers';

import { AddWeatherSubscriptionDocument } from './mutations';

export const addWeatherSubscription = async (
  weatherData: UserCitiesWeatherQuery,
  formData: FormData,
): Promise<void> => {
  const city = {
    name: formData.get('city') as string,
  };

  const { errors } = await getClient().mutate({
    mutation: AddWeatherSubscriptionDocument,
    variables: {
      city,
    },
  });

  if (errors?.length) {
    throw new ApolloError({ graphQLErrors: errors });
  }

  const { paginationOptions } = getPaginationParams();

  const totalCount = weatherData.userCitiesWeather.paginationInfo.totalCount;
  const totalPages = countTotalPages(weatherData.userCitiesWeather, paginationOptions)
  const isAddingNewPage = totalCount % env.NEXT_PUBLIC_WEATHER_CITIES_LIMIT === 0;

  if (paginationOptions.offset / paginationOptions.limit + 1 !== totalPages || isAddingNewPage) {
    const page = isAddingNewPage ? totalPages + 1 : totalPages;
    const path = `/weather-forecast?page=${page}&perPage=${paginationOptions.limit}&order=${paginationOptions.order}`;
    revalidatePath(path);

    // Redirect should be used outside of try...catch block:
    // https://github.com/vercel/next.js/issues/49298#issuecomment-1537433377
    redirect(path);
  } else {
    revalidateTag('forecasts');
  }
};
