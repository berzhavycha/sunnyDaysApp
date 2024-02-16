import { ApolloProvider } from '@apollo/client';
import { EventProvider } from 'react-native-outside-press';

import { CitySearchListProvider, CurrentUserProvider } from '@/context';
import { apolloClient } from '@/graphql';
import { InitialLayout } from '../InitialLayout';

export const MainLayout = (): JSX.Element => {
  return (
    <ApolloProvider client={apolloClient}>
      <CurrentUserProvider>
        <CitySearchListProvider>
          <EventProvider>
            <InitialLayout />
          </EventProvider>
        </CitySearchListProvider>
      </CurrentUserProvider>
    </ApolloProvider>
  );
};
