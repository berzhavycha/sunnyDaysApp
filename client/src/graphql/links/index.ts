import { ApolloLink, split } from '@apollo/client';

import { REACT_APP_GEODB_CLIENT_NAME } from '@env';
import { citiesHttpLink } from './cities';
import { errorLink } from './error';
import { mainHttpLink } from './main';

export const apolloLinks = ApolloLink.from([
  errorLink,
  split(
    (operation) => operation.getContext().clientName === REACT_APP_GEODB_CLIENT_NAME,
    citiesHttpLink,
    mainHttpLink,
  ),
]);
