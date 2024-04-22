import { FC, PropsWithChildren, Suspense } from 'react';

import {
  CurrentCityWeatherInfoProvider,
  CurrentTempUnitProvider,
  WeatherCardsListProvider,
  WeatherPaginationInfoProvider,
} from '@/context';
import { getWeatherForecasts } from '@/services/index-server';

// GitHub issue - https://github.com/vercel/next.js/issues/49757#issuecomment-1894910792
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { cookies } = require('next/headers');

export const WeatherForecastProviders: FC<PropsWithChildren> = async ({ children }) => {
  const weatherResponse = await getWeatherForecasts();
  const cookieTempUnit = cookies().get('current-temp-unit')

  return (
    <>
      {/*https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout*/}
      <Suspense>
        <CurrentTempUnitProvider cookieTempUnit={cookieTempUnit?.value}>
          <WeatherPaginationInfoProvider>
            <CurrentCityWeatherInfoProvider weatherResponse={JSON.stringify(weatherResponse)}>
              <WeatherCardsListProvider weatherResponse={JSON.stringify(weatherResponse)}>
                {children}
              </WeatherCardsListProvider>
            </CurrentCityWeatherInfoProvider>
          </WeatherPaginationInfoProvider>
        </CurrentTempUnitProvider>
      </Suspense>
    </>
  );
};
