'use server'

import { getClient } from "@/graphql/utils/getClient"
import { DeleteWeatherSubscriptionDocument } from "./mutations"
import { ApolloError } from "@apollo/client"
import { revalidateTag } from "next/cache"
import { UserCitiesWeatherQuery } from "../../fetchers"
import { PaginationQueryOptionsState } from "@/shared"
import { redirect } from "next/navigation"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { headers } = require('next/headers');

export const deleteWeatherSubscription = async (weatherData: UserCitiesWeatherQuery, cityName: string): Promise<void> => {
    const url = new URL(headers().get('x-url'));
    const searchParams = url.searchParams;

    const paginationOptions: PaginationQueryOptionsState = {
        offset: +(searchParams.get('page') ?? 0),
        limit: +(searchParams.get('perPage') ?? 6),
        order: searchParams.get('order') ?? "ASC"
    }

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
        (totalCount - 1) % 6 === 0 && weatherData.userCitiesWeather.edges.length === 1 && (totalCount - 1) > 0
    ) {
        const path = `/weather-forecast?page=${paginationOptions.offset - paginationOptions.limit}&perPage=${paginationOptions.limit}&order=${paginationOptions.order}`
        redirect(path)
    } else {
        revalidateTag('forecasts')
    }
}