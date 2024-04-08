'use server'

import { getClient } from "@/graphql/utils/getClient"
import { ApolloError } from "@apollo/client"
import { revalidateTag } from "next/cache"
import { UserCitiesWeatherQuery } from "../../fetchers"
import { AddWeatherSubscriptionDocument } from "./mutations"
import { validateCity } from "./utils"

type AddSubscriptionState = {
    weatherData: UserCitiesWeatherQuery | null
    error: string
}

export const addWeatherSubscription = async (prevData: AddSubscriptionState, formData: FormData): Promise<AddSubscriptionState> => {
    try {
        const city = {
            name: formData.get('city') as string,
        }

        const errorMessage = validateCity(city.name, prevData.weatherData);

        if (errorMessage) {
            return { ...prevData, error: errorMessage };
        }

        const { errors } = await getClient().mutate({
            mutation: AddWeatherSubscriptionDocument,
            variables: {
                city
            },
        })

        if (errors?.length) {
            throw new ApolloError({ graphQLErrors: errors })
        }

        revalidateTag('forecasts')
        return { ...prevData, error: '' }
    } catch (error) {
        // We have to stringify ApolloError instance due to this issue:
        // https://stackoverflow.com/a/78265128
        return { ...prevData, error: JSON.stringify(error) }
    }
}