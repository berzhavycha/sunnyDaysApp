import { setContext } from '@apollo/client/link/context';

import { env } from '@/core/env';
import { decrypt } from '@/shared';

export const forwardCookieLink = setContext(async (_, { headers, tokensHash }) => {
  const tokens = decrypt(tokensHash, env.SECRET_COOKIE_KEY);

  return {
    headers: {
      ...headers,
      Cookie: `tokens=${tokens}`,
    },
  };
});
