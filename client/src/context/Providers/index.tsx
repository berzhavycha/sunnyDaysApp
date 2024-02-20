import { FC, PropsWithChildren } from 'react';
import { ApolloProvider } from '@apollo/client';
import { EventProvider } from 'react-native-outside-press';

import { apolloClient } from '@/graphql';
import { CitySearchListProvider } from '../CitySearchList';
import { CurrentUserProvider } from '../CurrentUser';
import { SubscriptionErrorProvider } from '../SubscriptionError';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <CurrentUserProvider>
        <CitySearchListProvider>
          <SubscriptionErrorProvider>
            <EventProvider>{children}</EventProvider>
          </SubscriptionErrorProvider>
        </CitySearchListProvider>
      </CurrentUserProvider>
    </ApolloProvider>
  );
};
