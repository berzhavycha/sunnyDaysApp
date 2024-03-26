'use client';

import { FC, PropsWithChildren } from 'react';
import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support/ssr';

import { useMakeClient } from '@/graphql';
import { UpdateAuth } from '../UpdateAuth';

type Props = PropsWithChildren & {
  tokensHash: string;
};

export const ApolloClientWrapper: FC<Props> = ({ children, tokensHash }) => {
  const { makeClient } = useMakeClient();

  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      <UpdateAuth tokensHash={tokensHash}>{children}</UpdateAuth>
    </ApolloNextAppProvider>
  );
};
