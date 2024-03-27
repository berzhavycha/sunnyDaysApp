import { FC, PropsWithChildren } from "react";
import { ApolloProvider } from "@apollo/client";

import { apolloClient } from "@/graphql";

export const ApolloWrapper: FC<PropsWithChildren> = ({ children }) => {
    return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}