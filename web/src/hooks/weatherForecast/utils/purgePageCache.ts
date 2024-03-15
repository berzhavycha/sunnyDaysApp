import { UserCitiesWeatherQuery } from '../useWeatherData/queries';

export const purgePageCache = (
  edges: UserCitiesWeatherQuery['userCitiesWeather']['edges'],
  cityName: string,
): UserCitiesWeatherQuery['userCitiesWeather']['edges'] | undefined => {
  return edges?.map((edge) => {
    if (edge.city === cityName) {
      return { ...edge, _deleted: true };
    }

    return edge;
  });
};
