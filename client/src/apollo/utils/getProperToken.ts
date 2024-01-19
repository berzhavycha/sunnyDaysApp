import * as SecureStore from "expo-secure-store";
import { GraphQLRequest } from "@apollo/client";
import { isRefreshOperation } from "./isRefreshOperation";

export const getProperToken = async (operation: GraphQLRequest): Promise<string> => {
  const tokens = (await SecureStore.getItemAsync("tokens")) || "";
  const { accessToken, refreshToken } = JSON.parse(tokens);

  if (isRefreshOperation(operation)) {
    return refreshToken;
  }

  return accessToken;
};
