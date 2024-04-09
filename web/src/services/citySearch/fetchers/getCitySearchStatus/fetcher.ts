import { ApolloQueryResult } from "@apollo/client";
import { CitySearchStatusDocument, CitySearchStatusQuery } from "./queries";
import { getClient } from "@/graphql/utils/getClient";
import { env } from "@/core/env";


export const getCitySearchStatus = async (): Promise<ApolloQueryResult<CitySearchStatusQuery>> => {
    const data = await getClient().query({
        query: CitySearchStatusDocument,
        context: {
            fetchOptions: {
                next: {
                    revalidate: env.NEXT_PUBLIC_FEATURE_CACHE_SECONDS_TIME
                }
            }
        }
    })

    return data
}