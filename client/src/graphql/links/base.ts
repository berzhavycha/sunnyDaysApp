import { split } from '@apollo/client';

import { REACT_APP_GEODB_CLIENT_NAME } from '@env';
import { geodbHttpLink } from './geodb';
import { mainHttpLink } from './main';

export const baseLink = split(
  (operation) => operation.getContext().clientName === REACT_APP_GEODB_CLIENT_NAME,
  geodbHttpLink,
  mainHttpLink,
);
