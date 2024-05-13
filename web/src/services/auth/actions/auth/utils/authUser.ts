import { ApolloError } from '@apollo/client';

import { env } from '@/core/env';
import { AuthType } from '@/hooks';
import { extractCookiesFromResponse, UserDto } from '@/shared';

import { authMutations } from '../../../constants';

export const authUser = async (
  authType: AuthType,
  userDto: UserDto,
  extraVariables?: object,
): Promise<string | null> => {
  const variables = {
    ...userDto,
    ...extraVariables,
  };

  // we have to use fetch instead of Apollo Client to get access to cookies
  const response = await fetch(env.NEXT_PUBLIC_BASE_URL, {
    method: 'POST',
    body: JSON.stringify({
      query: authMutations[authType],
      variables,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { errors } = await response.json();
  if (errors) {
    throw new ApolloError({ graphQLErrors: errors });
  }

  return extractCookiesFromResponse(response, 'tokens');
};
