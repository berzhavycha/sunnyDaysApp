'use client'

import { FC, PropsWithChildren } from 'react';
import { useApolloClient } from '@apollo/client';

type Props = PropsWithChildren & {
    tokensHash: string;
};

export const UpdateAuth: FC<Props> = ({ children, tokensHash }): JSX.Element => {
    const client = useApolloClient()
    client.defaultContext.tokensHash = tokensHash

    return <>{children}</>;
};
