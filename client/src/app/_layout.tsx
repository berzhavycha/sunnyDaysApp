import { apolloClient } from 'src/graphql';
import { AuthProvider, useAuthManager } from '@/context';
import { ApolloProvider } from '@apollo/client';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

const InitialLayout = (): JSX.Element => {
  const { authState } = useAuthManager();
  const router = useRouter();
  const segments = useSegments();

  const inAppSegment = segments[0] === '(app)';

  useEffect(() => {
    if (authState.isAuthenticated && !inAppSegment) {
      router.replace('/forecast/');
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
        <InitialLayout />
      </AuthProvider>
    </ApolloProvider>
  );
};

export default RootLayout;
