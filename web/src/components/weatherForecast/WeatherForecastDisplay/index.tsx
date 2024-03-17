'use client'

import { Suspense } from 'react';

import { Spinner } from '@/components/common';
import { CurrentCityWeather, WeatherCardList, WeatherHeader } from './components';

export const WeatherForecastDisplay = (): JSX.Element => {
  return (
    <div className="flex gap-10 bg-gray-900 h-screen p-12 overflow-hidden">
      <CurrentCityWeather />
      <div className="w-3/4">
        <Suspense fallback={<Spinner />}>
          <WeatherHeader />
          <WeatherCardList />
        </Suspense>
      </div>
    </div>
  );
};
