import { FC, PropsWithChildren } from 'react';

import { ApolloWrapper } from '../ApolloWrapper';
import { CurrentUserProvider } from '../CurrentUser';
import { CitySearchListProvider } from '../CitySearchList';
import { CurrentTempUnitProvider } from '../CurrentTempUnit';
import { SubscriptionErrorProvider } from '../SubscriptionError';
import { WeatherPaginationQueryOptionsProvider } from '../WeatherPaginationOptions';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ApolloWrapper>
      <CurrentUserProvider>
        <CitySearchListProvider>
          <CurrentTempUnitProvider>
            <WeatherPaginationQueryOptionsProvider>
              <SubscriptionErrorProvider>{children}</SubscriptionErrorProvider>
            </WeatherPaginationQueryOptionsProvider>
          </CurrentTempUnitProvider>
        </CitySearchListProvider>
      </CurrentUserProvider>
    </ApolloWrapper>
  );
};
