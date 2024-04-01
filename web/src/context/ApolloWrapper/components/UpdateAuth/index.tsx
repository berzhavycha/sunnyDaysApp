'use client';

import { useApolloClient } from '@apollo/client';
import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  tokensHash: string;
};

export const UpdateAuth: FC<Props> = ({ children, tokensHash }) => {
  const client = useApolloClient();
  client.defaultContext.tokensHash = tokensHash;

  return <>{children}</>;
};
