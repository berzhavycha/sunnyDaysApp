import { Observable, FetchResult } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

import { apolloClient } from "../client";
import { refreshAccessToken } from "../utils";

export const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
        for (const err of graphQLErrors) {
            if (err.extensions.code === 'UNAUTHENTICATED') {
                if (operation.operationName === 'RefreshAccess' || operation.operationName === 'SignIn')
                    return;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const observable = new Observable<FetchResult<Record<string, any>>>((observer) => {
                    (async (): Promise<void> => {
                        try {
                            await refreshAccessToken(apolloClient);

                            const subscriber = {
                                next: observer.next.bind(observer),
                                error: observer.error.bind(observer),
                                complete: observer.complete.bind(observer),
                            };

                            forward(operation).subscribe(subscriber);
                        } catch (err) {
                            observer.error(err);
                        }
                    })();
                });

                return observable;
            }
        }
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
});