import { FC } from 'react';
import { ApolloProvider } from '@apollo/client';

import { Providers } from '@/context';
import { apolloClient } from '@/graphql';
import { InitialLayout } from '../InitialLayout';

export const MainLayout: FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Providers>
        <InitialLayout />
      </Providers>
    </ApolloProvider>
  );
};
