import { setContext } from '@apollo/client/link/context';

import { decrypt } from '@/shared';
import { env } from '@/core/env'

export const forwardCookieLink = setContext(async (_, { headers, tokensHash }) => {
  const tokens = decrypt(tokensHash, env.SECRET_COOKIE_KEY);

  return {
    headers: {
      ...headers,
      Cookie: `tokens=${tokens}`,
    },
  };
});
