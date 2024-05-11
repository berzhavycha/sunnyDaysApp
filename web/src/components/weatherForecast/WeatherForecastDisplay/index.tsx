import { FC, Suspense } from 'react';

import { Spinner } from '@/components/common';

import { WeatherForecastProviders } from '../WeatherForecastProviders';

import { CurrentCityWeather, WeatherData, WeatherHeader } from './components';
import { getWeatherForecasts } from '@/services/index-server';

export const WeatherForecastDisplay: FC = async () => {
  const { responseData } = await getWeatherForecasts();

  return (
    <WeatherForecastProviders>
      <div className="flex md:gap-0 bg-gray-900 min-h-screen 2xl:h-screen p-6 py-8 md:p-12 overflow-hidden">
        <CurrentCityWeather weatherResponse={JSON.stringify(responseData)} />
        <div className="w-full md:w-1/2 md:ml-[52%] lg:ml-[45%] lg:w-full xl:ml-[37%] 2xl:ml-[28%]">
          <WeatherHeader />
          <Suspense fallback={<Spinner />}>
            <WeatherData />
          </Suspense>
        </div>
      </div>
    </WeatherForecastProviders>
  );
};
