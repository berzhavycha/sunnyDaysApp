import { HttpLink } from '@apollo/client';

import { BASE_URL } from '@/global';

export const mainHttpLink = new HttpLink({
  uri: BASE_URL,
  credentials: 'include',
});
