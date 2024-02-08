import { HttpLink } from '@apollo/client';

import { REACT_APP_GRAPHQL_BASE_URL } from '@env';

export const mainHttpLink = new HttpLink({
  uri: "https://44c3-194-44-70-13.ngrok-free.app/api/graphql",
  credentials: 'include',
});
