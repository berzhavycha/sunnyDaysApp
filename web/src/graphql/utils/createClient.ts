import { ApolloClient, ApolloLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { mainHttpLink } from '../links';
import { resolvers } from '../resolvers';

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
});

export const createClient = (): ApolloClient<NormalizedCacheObject> => {
    const apolloClient = new ApolloClient({
        cache: new InMemoryCache(),
        resolvers,
        defaultOptions: {
            query: {
                errorPolicy: 'all',
            },
        },
    });

    const apolloLinks = ApolloLink.from([
        forwardCookieServerLink,
        mainHttpLink,
    ]);

    apolloClient.setLink(apolloLinks);

    return apolloClient;
};
