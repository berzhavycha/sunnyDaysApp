import { GraphQLRequest } from "@apollo/client";

export const isRefreshOperation = (operation: GraphQLRequest): boolean => {
  return operation.operationName === "refreshToken";
};
