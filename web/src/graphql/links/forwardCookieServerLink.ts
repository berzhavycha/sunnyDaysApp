import { setContext } from '@apollo/client/link/context';

// GitHub issue - https://github.com/vercel/next.js/issues/49757#issuecomment-1894910792
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { cookies } = require('next/headers');

export const forwardCookieServerLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      Cookie: cookies()
        .getAll()
        .map(({ name, value }: { name: string; value: string }) => `${name}=${value}`)
        .join(';'),
    },
  };
});
