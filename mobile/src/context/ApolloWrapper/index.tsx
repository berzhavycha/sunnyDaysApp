import { ApolloProvider } from '@apollo/client';
import { FC, PropsWithChildren } from 'react';

import { apolloClient } from '@/graphql';

export const ApolloWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
