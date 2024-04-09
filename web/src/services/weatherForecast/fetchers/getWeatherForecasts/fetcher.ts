import { getClient } from "@/graphql/utils/getClient"
import { UserCitiesWeatherDocument, UserCitiesWeatherQuery } from "./queries"
import { getPaginationParams } from "@/shared"
import { ApolloQueryResult } from "@apollo/client"
import { env } from "@/core/env"

export const getWeatherForecasts = async (): Promise<ApolloQueryResult<UserCitiesWeatherQuery>> => {
    const paginationOptions = getPaginationParams()

    const data = await getClient().query({
        query: UserCitiesWeatherDocument,
        variables: {
            ...paginationOptions,
            forecastDaysAmount: env.NEXT_PUBLIC_MAX_FORECAST_DAYS
        },
        context: {
            fetchOptions: {
                next: {
                    revalidate: env.NEXT_PUBLIC_WEATHER_FORECAST_CACHE_SECONDS_TIME,
                    tags: ['forecasts']
                }
            }
        }
    })

    return data
}