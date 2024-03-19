import { Suspense } from 'react';

import { Spinner } from '@/components/common';
import { CurrentCityWeather, WeatherCardList, WeatherHeader } from './components';

export const WeatherForecastDisplay = (): JSX.Element => {
  return (
    <div className="flex flex-col sm:flex-row md:gap-0 gap-10 bg-gray-900 min-h-[100vh] 2xl:h-screen p-6 py-8 md:p-12 overflow-hidden">
      <CurrentCityWeather />
      <div className="w-full md:w-1/2 md:ml-[52%] lg:ml-[45%] lg:w-full xl:ml-[37%] 2xl:ml-[28%]">
        <Suspense fallback={<Spinner />}>
          <WeatherHeader />
          <WeatherCardList />
        </Suspense>
      </div>
    </div>
  );
};
