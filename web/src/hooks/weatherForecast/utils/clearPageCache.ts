import { ApolloClient } from '@apollo/client';

import { PaginationQueryOptionsState } from '@/shared';
import { MAX_FORECAST_DAYS } from '@/global';

export const clearPageCache = (client: ApolloClient<object>, paginationOptions: PaginationQueryOptionsState): void => {
    client.cache.modify({
        fields: {
            userCitiesWeather(existingPageData) {
                client.cache.evict({
                    fieldName: 'userCitiesWeather',
                    args: {
                        ...paginationOptions,
                        forecastDaysAmount: MAX_FORECAST_DAYS,
                    },
                });

                return existingPageData;
            },
        },
    });
};
