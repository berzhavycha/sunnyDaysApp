import { FC, PropsWithChildren } from 'react';
import { EventProvider } from 'react-native-outside-press';

import { Compose } from '@/components';
import { CitySearchListProvider } from '../CitySearchList';
import { CurrentUserProvider } from '../CurrentUser';
import { SubscriptionErrorProvider } from '../SubscriptionError';
import { CurrentTempUnitProvider } from '../CurrentTempUnit';
import { WeatherCardsListProvider } from '../WeatherCardsListProvider';
import { WeatherPaginationInfoProvider } from '../WeatherPaginationInfo';
import { ApolloWrapper } from '../ApolloWrapper';

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
        EventProvider
      ]}
    >
      {children}
    </Compose>
  );
};
