import { ApolloProvider } from '@apollo/client';
import { EventProvider } from 'react-native-outside-press';

import { AuthProvider } from '@/context';
import { apolloClient } from '@/graphql';
import { InitialLayout } from '../InitialLayout';

export const MainLayout = (): JSX.Element => {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <EventProvider>
          <InitialLayout />
        </EventProvider>
      </AuthProvider>
    </ApolloProvider>
  );
};
