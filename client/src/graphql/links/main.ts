import { Env } from '@/env';
import { HttpLink } from '@apollo/client';

export const mainHttpLink = new HttpLink({
  uri: Env.REACT_APP_GRAPHQL_BASE_URL,
  credentials: 'include',
});
