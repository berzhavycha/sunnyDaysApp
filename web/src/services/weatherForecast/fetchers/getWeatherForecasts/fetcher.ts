import { getClient } from "@/graphql/utils/getClient"
import { UserCitiesWeatherDocument, UserCitiesWeatherQuery } from "./queries"
import { getPaginationParams } from "@/shared"
import { ApolloQueryResult } from "@apollo/client"

export const getWeatherForecasts = async (): Promise<ApolloQueryResult<UserCitiesWeatherQuery>> => {
    const paginationOptions = getPaginationParams()

    const data = await getClient().query({
        query: UserCitiesWeatherDocument,
        variables: {
            ...paginationOptions,
            forecastDaysAmount: 3
        },
        context: {
            fetchOptions: {
                next: {
                    revalidate: 1800,
                    tags: ['forecasts']
                }
            }
        }
    })

    return data
}