'use server'

import { getClient } from "@/graphql/utils/getClient";
import { CurrentUserDocument, CurrentUserQuery } from "./queries";
import { ApolloQueryResult } from "@apollo/client";

export const getCurrentUser = async (): Promise<ApolloQueryResult<CurrentUserQuery>> => {
    return getClient().query({
        query: CurrentUserDocument,
    });
}