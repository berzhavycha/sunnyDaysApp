import { getClient } from "@/graphql/utils/getClient"
import { UserCitiesWeatherDocument, UserCitiesWeatherQuery } from "@/hooks"
import { PaginationQueryOptionsState } from "@/shared"
import { ApolloQueryResult } from "@apollo/client"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { headers } = require('next/headers');


export const getWeatherForecasts = async (): Promise<ApolloQueryResult<UserCitiesWeatherQuery>> => {
    const url = new URL(headers().get('x-url')!);
    const searchParams = url.searchParams;

    const paginationOptions: PaginationQueryOptionsState = {
        offset: +(searchParams.get('page') ?? 0),
        limit: +(searchParams.get('perPage') ?? 6),
        order: searchParams.get('order') ?? "ASC"
    }
    
    
    const data = await getClient().query({
        query: UserCitiesWeatherDocument,
        variables: {
            ...paginationOptions,
            forecastDaysAmount: 3
        },
        context: {
            fetchOptions: {
                next: {
                    tags: ['forecasts']
                }
            }
        }
    })

    return data
}