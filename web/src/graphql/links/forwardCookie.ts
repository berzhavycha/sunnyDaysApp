import { SECRET_COOKIE_KEY } from '@/global';
import { decrypt } from '@/shared';
import { setContext } from '@apollo/client/link/context';

export const forwardCookieLink = setContext(async (_, { headers, tokensHash }) => {
  const tokens = decrypt(tokensHash, SECRET_COOKIE_KEY);

  return {
    headers: {
      ...headers,
      Cookie: `tokens=${tokens}`,
    },
  };
});
