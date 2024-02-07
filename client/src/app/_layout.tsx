import { useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import { Slot, useRouter, useSegments } from 'expo-router';
import { EventProvider } from 'react-native-outside-press';

import { AuthProvider, useAuthManager } from '@/context';
import { apolloClient } from '@/graphql';

const InitialLayout = (): JSX.Element => {
  const { authState } = useAuthManager();
  const router = useRouter();
  const segments = useSegments();

  const inAppSegment = segments[0] === '(app)';

  useEffect(() => {
    if (authState.isAuthenticated && !inAppSegment) {
      router.replace('/weather-forecast/');
    } else if (!authState.isAuthenticated) {
      router.replace('/sign-in/');
    }
  }, [authState]);

  return <Slot />;
};

const RootLayout = (): JSX.Element => {
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

export default RootLayout;
