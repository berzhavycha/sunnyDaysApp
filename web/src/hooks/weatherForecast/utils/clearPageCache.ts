import { ApolloClient } from '@apollo/client';

import { env } from '@/core/env';
import { PaginationQueryOptionsState } from '@/shared';

export const clearPageCache = (
  client: ApolloClient<object>,
  paginationOptions: PaginationQueryOptionsState,
): void => {
  client.cache.modify({
    fields: {
      userCitiesWeather(existingPageData) {
        client.cache.evict({
          fieldName: 'userCitiesWeather',
          args: {
            ...paginationOptions,
            forecastDaysAmount: env.NEXT_PUBLIC_MAX_FORECAST_DAYS,
          },
        });

        return existingPageData;
      },
    },
  });
};
