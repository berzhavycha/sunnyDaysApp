import { HttpLink } from '@apollo/client';

import { Env } from '@/env';

export const mainHttpLink = new HttpLink({
  uri: Env.BASE_URL,
  credentials: 'include',
});
