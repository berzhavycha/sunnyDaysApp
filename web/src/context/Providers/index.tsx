import { FC, PropsWithChildren } from 'react';

import { ApolloWrapper } from '../ApolloWrapper';
import { CurrentUserProvider } from '../CurrentUser';
import { CitySearchListProvider } from '../CitySearchList';
import { CurrentTempUnitProvider } from '../CurrentTempUnit';
import { SubscriptionErrorProvider } from '../SubscriptionError';
import { WeatherPaginationInfoProvider } from '../WeatherPaginationInfo';
import { CurrentCityWeatherInfoProvider } from '../CurrentCityWeatherInfo';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ApolloWrapper>
      <CurrentUserProvider>
        <CitySearchListProvider>
          <CurrentTempUnitProvider>
            <WeatherPaginationInfoProvider >
              <CurrentCityWeatherInfoProvider>
                <SubscriptionErrorProvider>{children}</SubscriptionErrorProvider>
              </CurrentCityWeatherInfoProvider>
            </WeatherPaginationInfoProvider>
          </CurrentTempUnitProvider>
        </CitySearchListProvider>
      </CurrentUserProvider>
    </ApolloWrapper>
  );
};
