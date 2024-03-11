import { Suspense } from 'react';
import { CurrentCityWeather, WeatherCardList, WeatherHeader } from './components';
import { Spinner } from '@/components';

export const WeatherForecastDisplay = (): JSX.Element => {
  return (
    <div className="flex gap-10 bg-gray-900 h-screen p-12 overflow-hidden">
      <Suspense fallback={<Spinner />}>
        <CurrentCityWeather />
      </Suspense>
      <div className="w-3/4">
        <WeatherHeader />
        <Suspense fallback={<Spinner />}>
          <WeatherCardList />
        </Suspense>
      </div>
    </div>
  );
};
