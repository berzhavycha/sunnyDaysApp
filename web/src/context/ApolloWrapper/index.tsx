'use client';

import { PropsWithChildren } from 'react';
import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support/ssr';

import { useMakeClient } from '@/graphql';

export const ApolloWrapper = ({ children }: PropsWithChildren): JSX.Element => {
  const { makeClient } = useMakeClient();

  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
};
