import { ApolloQueryResult, ApolloError } from "@apollo/client";

export type FetchResponse<T> = {
    responseData: ApolloQueryResult<T> | null;
    error: ApolloError | null;
  };
  