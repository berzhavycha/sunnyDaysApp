import { PropsWithChildren } from 'react';
// GitHub issue - https://github.com/vercel/next.js/issues/49757#issuecomment-1894910792
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { cookies } = require('next/headers');

import { encrypt } from '@/shared';
import { env } from '@/core/env';
import { ApolloClientWrapper } from './components';

export const ApolloWrapper = ({ children }: PropsWithChildren): JSX.Element => {
  // we have to pass auth tokens in the cookies manually to httpLink due to this GitHub issue:
  // https://github.com/apollographql/apollo-client-nextjs/issues/85
  const cookiesStore = cookies();
  const tokensHash = encrypt(cookiesStore.get('tokens')?.value, env.SECRET_COOKIE_KEY);

  return <ApolloClientWrapper tokensHash={tokensHash}>{children}</ApolloClientWrapper>;
};
