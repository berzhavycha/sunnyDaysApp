'use server'

import { getClient } from "@/graphql/utils/getClient"
import { DeleteWeatherSubscriptionDocument } from "./mutations"
import { ApolloError } from "@apollo/client"
import { revalidateTag } from "next/cache"
import { UserCitiesWeatherQuery } from "../../fetchers"
import { getPaginationParams } from "@/shared"
import { redirect } from "next/navigation"
import { env } from "@/core/env"


export const deleteWeatherSubscription = async (weatherData: UserCitiesWeatherQuery, cityName: string): Promise<void> => {
    const paginationOptions = getPaginationParams()

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

    const totalCount = weatherData.userCitiesWeather.paginationInfo.totalCount

    if (
        (totalCount - 1) % env.NEXT_PUBLIC_WEATHER_CITIES_LIMIT === 0 && weatherData.userCitiesWeather.edges.length === 1 && (totalCount - 1) > 0
    ) {
        const path = `/weather-forecast?page=${paginationOptions.offset - paginationOptions.limit}&perPage=${paginationOptions.limit}&order=${paginationOptions.order}`
        redirect(path)
    } else {
        revalidateTag('forecasts')
    }
}