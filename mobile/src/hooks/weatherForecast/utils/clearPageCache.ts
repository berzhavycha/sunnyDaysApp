import { ApolloClient } from '@apollo/client';

import { Env } from '@/env';
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
            forecastDaysAmount: Env.MAX_FORECAST_DAYS,
          },
        });

        return existingPageData;
      },
    },
  });
};
