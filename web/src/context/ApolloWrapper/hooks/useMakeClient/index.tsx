import { errorLink, refreshTokenLink, mainHttpLink } from "@/graphql/links";
import { NormalizedCacheObject, ApolloLink } from "@apollo/client";
import { NextSSRApolloClient, NextSSRInMemoryCache, SSRMultipartLink } from "@apollo/experimental-nextjs-app-support/ssr";

type UseMakeClientReturn = {
    makeClient: () => NextSSRApolloClient<NormalizedCacheObject>
}

export const useMakeClient = (): UseMakeClientReturn => {
    const makeClient = (): NextSSRApolloClient<NormalizedCacheObject> => {
        const client = new NextSSRApolloClient({
            cache: new NextSSRInMemoryCache(),
        });

        const apolloLinks = ApolloLink.from([
            errorLink.split(
                (operation) => operation.getContext().unauthenticated,
                refreshTokenLink(client),
            ),
            mainHttpLink,
        ]);

        client.setLink(
            typeof window === undefined
                ? ApolloLink.from([
                    new SSRMultipartLink({
                        stripDefer: true,
                    }),
                    apolloLinks,
                ])
                : apolloLinks,
        );

        return client;
    }

    return { makeClient }
}