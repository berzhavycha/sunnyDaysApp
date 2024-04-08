'use server'

import { getClient } from "@/graphql/utils/getClient"
import { DeleteWeatherSubscriptionDocument } from "./mutations"
import { ApolloError } from "@apollo/client"
import { revalidateTag } from "next/cache"

export const deleteWeatherSubscription = async (cityName: string): Promise<void> => {
    const { errors } = await getClient().mutate({
        mutation: DeleteWeatherSubscriptionDocument,
        variables: {
            city: {
                name: cityName
            }
        }
    })

    if (errors?.length) {
        throw new ApolloError({ graphQLErrors: errors })
    }

    revalidateTag('forecasts')
}