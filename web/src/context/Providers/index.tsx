import { FC, PropsWithChildren } from 'react';

import { ApolloWrapper } from '../ApolloWrapper';
import { CurrentUserProvider } from '../CurrentUser';
import { CitySearchListProvider } from '../CitySearchList';
import { CurrentTempUnitProvider } from '../CurrentTempUnit';
import { SubscriptionErrorProvider } from '../SubscriptionError';
import { WeatherPaginationQueryOptionsProvider } from '../WeatherPaginationOptions';
import { CurrentCityWeatherInfoProvider } from '..';
import { WeatherDataProvider } from '../WeatherData';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ApolloWrapper>
      <CurrentUserProvider>
        <CitySearchListProvider>
          <CurrentTempUnitProvider>
            <WeatherPaginationQueryOptionsProvider>
              <CurrentCityWeatherInfoProvider>
                <SubscriptionErrorProvider>
                  <WeatherDataProvider>
                    {children}
                  </WeatherDataProvider>
                </SubscriptionErrorProvider>
              </CurrentCityWeatherInfoProvider>
            </WeatherPaginationQueryOptionsProvider>
          </CurrentTempUnitProvider>
        </CitySearchListProvider>
      </CurrentUserProvider>
    </ApolloWrapper>
  );
};
