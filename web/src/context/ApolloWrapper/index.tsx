import { PropsWithChildren } from 'react';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { cookies } = require('next/headers');

import { encrypt } from '@/shared';
import { env } from '@/core/env'
import { ApolloClientWrapper } from './components';

export const ApolloWrapper = ({ children }: PropsWithChildren): JSX.Element => {
  const cookiesStore = cookies();
  const tokensHash = encrypt(cookiesStore.get('tokens')?.value, env.SECRET_COOKIE_KEY);

  return <ApolloClientWrapper tokensHash={tokensHash}>{children}</ApolloClientWrapper>;
};
