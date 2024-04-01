import { FC, PropsWithChildren } from 'react';
import { EventProvider } from 'react-native-outside-press';

import { Compose } from '@/components/common';

import { ApolloWrapper } from '../ApolloWrapper';
import { CitySearchListProvider } from '../CitySearchList';
import { CurrentTempUnitProvider } from '../CurrentTempUnit';
import { CurrentUserProvider } from '../CurrentUser';
import { SubscriptionErrorProvider } from '../SubscriptionError';
import { WeatherCardsListProvider } from '../WeatherCardsListProvider';
import { WeatherPaginationInfoProvider } from '../WeatherPaginationInfo';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Compose
      components={[
        ApolloWrapper,
        CurrentUserProvider,
        CitySearchListProvider,
        SubscriptionErrorProvider,
        CurrentTempUnitProvider,
        WeatherCardsListProvider,
        WeatherPaginationInfoProvider,
        EventProvider,
      ]}
    >
      {children}
    </Compose>
  );
};
