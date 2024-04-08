import { InMemoryCache, ApolloClient, ApolloLink } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

import { errorLink, refreshTokenLink, mainHttpLink } from "../links";
import { resolvers } from "../resolvers";
import { setContext } from "@apollo/client/link/context";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { cookies } = require('next/headers');


const forwardCookieServerLink = setContext(async (_, { headers }) => {
    const tokens = cookies().get('tokens');

    return {
        headers: {
            ...headers,
            Cookie: `tokens=${tokens?.value}`,
        },
    };
})

export const { getClient } = registerApolloClient(() => {
    const apolloClient = new ApolloClient({
        cache: new InMemoryCache(),
        resolvers,
        defaultOptions: {
            query: {
                errorPolicy: 'all'
            }
        }
    });

    const apolloLinks = ApolloLink.from([
        errorLink.split(
            (operation) => operation.getContext().unauthenticated,
            refreshTokenLink(apolloClient),
        ),
        forwardCookieServerLink,
        mainHttpLink,
    ]);

    apolloClient.setLink(apolloLinks);

    return apolloClient
});