import { City, CityQueryResponse } from '../types';

export const extractData = (data: CityQueryResponse): City[] => data && data.populatedPlaces.edges;
