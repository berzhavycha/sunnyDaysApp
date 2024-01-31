import { City, CityQuery } from '../interfaces';

export const extractData = (data: CityQuery): City[] => data && data.populatedPlaces.edges;
