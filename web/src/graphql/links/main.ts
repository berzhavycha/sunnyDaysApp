import { BASE_URL } from '@/global';

import { HttpLink } from '@apollo/client';

export const mainHttpLink = new HttpLink({
  uri: BASE_URL,
  credentials: 'include',
});
