'use client'

import { FC, PropsWithChildren } from 'react';

import { useMakeClient } from '@/graphql';
import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support/ssr';

export const ApolloWrapper: FC = ({ children }: PropsWithChildren) => {
  const { makeClient } = useMakeClient();

  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
};
