'use server'

import { getClient } from "@/graphql/utils/getClient";
import { CitiesDocument } from "./queries";
import { getCitiesQueryVariables, extractData } from "./utils";
import { City } from "@/shared"

export const getCitiesByPrefix = async (city: string): Promise<City[]> => {
    const { data } = await getClient().query({
        query: CitiesDocument,
        variables: getCitiesQueryVariables(city)
    });

    return extractData(data);
}