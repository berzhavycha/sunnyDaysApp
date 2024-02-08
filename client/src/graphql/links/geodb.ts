import { HttpLink } from '@apollo/client';

import {
  REACT_APP_GEODB_CITIES_URL,
  REACT_APP_GEODB_CITIES_API_KEY,
  REACT_APP_GEODB_CITIES_HOST,
} from '@env';

export const geodbHttpLink = new HttpLink({
  uri: REACT_APP_GEODB_CITIES_URL,
  headers: {
    'x-rapidapi-key': REACT_APP_GEODB_CITIES_API_KEY,
    'x-rapidapi-host': REACT_APP_GEODB_CITIES_HOST,
    'Content-Type': 'application/json',
  },
});
