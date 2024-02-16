import { ApolloProvider } from '@apollo/client';

import { Providers } from '@/context';
import { apolloClient } from '@/graphql';
import { InitialLayout } from '../InitialLayout';

export const MainLayout = (): JSX.Element => {
  return (
    <ApolloProvider client={apolloClient}>
      <Providers>
        <InitialLayout />
      </Providers>
    </ApolloProvider>
  );
};
