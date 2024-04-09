'use server'

import { getClient } from "@/graphql/utils/getClient"
import { ApolloError } from "@apollo/client"
import { revalidatePath, revalidateTag } from "next/cache"
import { UserCitiesWeatherQuery } from "../../fetchers"
import { AddWeatherSubscriptionDocument } from "./mutations"
import { validateCity } from "./utils"
import { getPaginationParams } from "@/shared"
import { redirect } from "next/navigation"
import { env } from "@/core/env"

type AddSubscriptionState = {
    error: string
}

export const addWeatherSubscription = async (weatherData: UserCitiesWeatherQuery, prevData: AddSubscriptionState, formData: FormData): Promise<AddSubscriptionState> => {
    const paginationOptions = getPaginationParams()

    try {
        const city = {
            name: formData.get('city') as string,
        }

        const errorMessage = validateCity(city.name, weatherData);

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
    } catch (error) {
        // We have to stringify ApolloError instance due to this issue:
        // https://stackoverflow.com/a/78265128
        return { ...prevData, error: JSON.stringify(error) }
    }

    const totalCount = weatherData.userCitiesWeather.paginationInfo.totalCount
    const totalPages = Math.ceil(totalCount / paginationOptions.limit)
    const isAddingNewPage = totalCount % env.NEXT_PUBLIC_WEATHER_CITIES_LIMIT === 0
    if ((paginationOptions.offset / paginationOptions.limit + 1) !== totalPages || isAddingNewPage) {
        const offset = isAddingNewPage ? totalPages : totalPages - 1
        const path = `/weather-forecast?page=${offset * paginationOptions.limit}&perPage=${paginationOptions.limit}&order=${paginationOptions.order}`
        revalidatePath(path)

        // Redirect should be used outside of try...catch block:
        // https://github.com/vercel/next.js/issues/49298#issuecomment-1537433377
        redirect(path)
    } else {
        revalidateTag('forecasts')
    }

    return { ...prevData, error: '' }
}