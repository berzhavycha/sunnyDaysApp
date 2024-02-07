import { HttpLink } from "@apollo/client";

import { REACT_APP_GRAPHQL_BASE_URL } from "@env";

export const mainHttpLink = new HttpLink({
    uri: REACT_APP_GRAPHQL_BASE_URL,
    credentials: 'include',
});