import { FC, PropsWithChildren } from 'react';
import { ApolloProvider } from '@apollo/client';
import { EventProvider } from 'react-native-outside-press';

import { apolloClient } from '@/graphql';
import { CitySearchListProvider } from '../CitySearchList';
import { CurrentUserProvider } from '../CurrentUser';
import { SubscriptionErrorProvider } from '../SubscriptionError';
import { CurrentTempUnitProvider } from '../CurrentTempUnit';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <CurrentUserProvider>
        <CitySearchListProvider>
          <SubscriptionErrorProvider>
            <CurrentTempUnitProvider>
              <EventProvider>{children}</EventProvider>
            </CurrentTempUnitProvider>
          </SubscriptionErrorProvider>
        </CitySearchListProvider>
      </CurrentUserProvider>
    </ApolloProvider>
  );
};
