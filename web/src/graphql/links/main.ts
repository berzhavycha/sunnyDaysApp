import { HttpLink } from '@apollo/client';

import { env } from '@/core/env';

export const mainHttpLink = new HttpLink({
  uri: env.NEXT_PUBLIC_BASE_URL,
  credentials: 'include',
});
