import { FC, PropsWithChildren } from 'react';

import { CurrentCityWeatherInfoProvider } from '@/context';
import { getWeatherForecasts } from '@/services/index-server';

export const WeatherResponseProviders: FC<PropsWithChildren> = async ({ children }) => {
  const weatherResponse = await getWeatherForecasts();

  return (
    <CurrentCityWeatherInfoProvider weatherResponse={JSON.stringify(weatherResponse)}>
      {children}
    </CurrentCityWeatherInfoProvider>
  );
};
