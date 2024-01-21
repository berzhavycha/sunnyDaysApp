import { apolloClient } from '@/apollo';
import { AuthProvider, useAuth } from '@/context';
import { ApolloProvider } from '@apollo/client';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

const InitialLayout = (): JSX.Element => {
  const { authState } = useAuth();
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
    <AuthProvider>
      <ApolloProvider client={apolloClient}>
        <InitialLayout />
      </ApolloProvider>
    </AuthProvider>
  );
};

export default RootLayout;
