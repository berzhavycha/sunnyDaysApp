import { CitiesQuery } from "../hooks/useCityInputComplete/queries";
import { City } from "../types";

export const extractData = (data: CitiesQuery): City[] => {
    if (!data || !data.populatedPlaces || !data.populatedPlaces.edges) {
        return [];
    }

    return data.populatedPlaces.edges.map(edge => ({
        node: {
            name: edge?.node?.name || '',
        }
    }));
};
