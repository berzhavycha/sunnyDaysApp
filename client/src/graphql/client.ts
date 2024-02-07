import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  split,
} from '@apollo/client';
import { REACT_APP_GEODB_CLIENT_NAME } from '@env';
import { citiesHttpLink, errorLink, mainHttpLink } from './links';

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    split(
      (operation) => operation.getContext().clientName === REACT_APP_GEODB_CLIENT_NAME,
      citiesHttpLink,
      mainHttpLink,
    ),
  ]),
  cache: new InMemoryCache(),
});
