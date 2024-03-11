'use client';

import { FC, PropsWithChildren } from 'react';
import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support/ssr';

import { useMakeClient } from '@/graphql';

type Props = PropsWithChildren & {
    tokensHash: string
}

export const ApolloClientWrapper: FC<Props> = ({ children, tokensHash }): JSX.Element => {
    const { makeClient } = useMakeClient(tokensHash);

    return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
};
