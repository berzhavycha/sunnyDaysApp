import { ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export const forwardCookieLink = (name: string, value: string): ApolloLink => {
  return setContext(async () => {
    return {
      headers: {
        cookie: `${name}=${value}`,
      },
    };
  });
};
