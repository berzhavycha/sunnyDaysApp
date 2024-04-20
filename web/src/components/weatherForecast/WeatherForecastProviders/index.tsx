import { FC, PropsWithChildren, Suspense } from 'react';

import { CurrentCityWeatherInfoProvider, WeatherCardsListProvider, WeatherPaginationInfoProvider } from '@/context';
import { getWeatherForecasts } from '@/services/index-server';

export const WeatherForecastProviders: FC<PropsWithChildren> = async ({ children }) => {
  const weatherResponse = await getWeatherForecasts();

  return (
    <>
      {/*https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout*/}
      <Suspense>
        <WeatherPaginationInfoProvider>
          <CurrentCityWeatherInfoProvider weatherResponse={JSON.stringify(weatherResponse)}>
            <WeatherCardsListProvider weatherResponse={JSON.stringify(weatherResponse)}>
              {children}
            </WeatherCardsListProvider>
          </CurrentCityWeatherInfoProvider>
        </WeatherPaginationInfoProvider>
      </Suspense >
    </>
  );
};
