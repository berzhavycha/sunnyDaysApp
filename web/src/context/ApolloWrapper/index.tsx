'use client';

import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support/ssr';
import { FC, PropsWithChildren } from 'react';

import { useMakeClient } from '@/graphql';

export const ApolloWrapper: FC = ({ children }: PropsWithChildren) => {
  const { makeClient } = useMakeClient();

  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
};
