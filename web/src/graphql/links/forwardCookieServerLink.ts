import { setContext } from '@apollo/client/link/context';

// GitHub issue - https://github.com/vercel/next.js/issues/49757#issuecomment-1894910792
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { cookies } = require('next/headers');

export const forwardCookieServerLink = setContext(async (_, { headers }) => {
    const tokens = cookies().get('tokens');

    return {
        headers: {
            ...headers,
            Cookie: `tokens=${tokens?.value}`,
        },
    };
});
