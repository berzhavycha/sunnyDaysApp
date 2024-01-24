import { City, CityQuery } from '..';

export const extractData = (data: CityQuery): City[] => data && data.populatedPlaces.edges;
