import { FC, PropsWithChildren } from 'react';

import { Compose } from '@/components';

import { ApolloWrapper } from '../ApolloWrapper';
import { CitySearchListProvider } from '../CitySearchList';
import { CurrentCityWeatherInfoProvider } from '../CurrentCityWeatherInfo';
import { CurrentTempUnitProvider } from '../CurrentTempUnit';
import { CurrentUserProvider } from '../CurrentUser';
import { SubscriptionErrorProvider } from '../SubscriptionError';
import { WeatherPaginationInfoProvider } from '../WeatherPaginationInfo';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Compose
      components={[
        ApolloWrapper,
        CurrentUserProvider,
        CitySearchListProvider,
        CurrentTempUnitProvider,
        WeatherPaginationInfoProvider,
        CurrentCityWeatherInfoProvider,
        SubscriptionErrorProvider,
      ]}
    >
      {children}
    </Compose>
  );
};
