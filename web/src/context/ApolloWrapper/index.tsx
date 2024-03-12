import { PropsWithChildren } from 'react';
import { ApolloClientWrapper } from './components';
import { encrypt } from '@/shared';
import { SECRET_COOKIE_KEY } from '@/global';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { cookies } = require('next/headers');

export const ApolloWrapper = ({ children }: PropsWithChildren): JSX.Element => {
  const cookiesStore = cookies();
  const tokensHash = encrypt(cookiesStore.get('tokens')?.value, SECRET_COOKIE_KEY as string);

  return <ApolloClientWrapper tokensHash={tokensHash}>{children}</ApolloClientWrapper>;
};
