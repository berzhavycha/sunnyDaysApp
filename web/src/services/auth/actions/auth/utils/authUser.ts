import { AuthType } from "@/hooks";
import { UserDto, extractCookiesFromResponse } from "@/shared";
import { getAuthMutation } from "./getAuthMutation";
import { env } from "@/core/env";
import { ApolloError } from "@apollo/client";

export const authUser = async (authType: AuthType, userDto: UserDto, extraVariables?: object): Promise<string | null> => {
    const variables = {
        ...userDto,
        ...extraVariables
    };

    const response = await fetch(env.NEXT_PUBLIC_BASE_URL, {
        method: 'POST',
        body: JSON.stringify({
            query: getAuthMutation(authType),
            variables
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const { errors } = await response.json()
    if (errors) {
        throw new ApolloError({ graphQLErrors: errors })
    }

    return extractCookiesFromResponse(response, 'tokens');
};
