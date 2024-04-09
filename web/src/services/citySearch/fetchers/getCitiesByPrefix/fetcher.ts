import { getClient } from "@/graphql/utils/getClient"
import { ApolloQueryResult } from "@apollo/client"
import { env } from "@/core/env"
import { CitiesDocument, CitiesQuery } from "./queries";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { headers } = require('next/headers');

export const getCitiesByPrefix = async (): Promise<ApolloQueryResult<CitiesQuery>> => {
    const url = new URL(headers().get('x-url'));
    const searchParams = url.searchParams;

    const city = searchParams.get('citySearch') ?? ''

    const data = await getClient().query({
        query: CitiesDocument,
        variables: {
            prefix: city,
            limit: env.NEXT_PUBLIC_CITIES_SEARCH_LIMIT,
            sort: env.NEXT_PUBLIC_CITIES_SEARCH_SORT,
            minPopulation: env.NEXT_PUBLIC_CITIES_SEARCH_MIN_POPULATION,
            offset: env.NEXT_PUBLIC_CITIES_SEARCH_OFFSET
        }
    })

    return data
}