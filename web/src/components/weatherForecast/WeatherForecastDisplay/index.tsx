import { FC } from 'react';

import { WeatherCardsListProvider } from '@/context';
import { WeatherData, CurrentCityWeather, WeatherHeader } from './components';
import { getWeatherForecasts } from '@/shared/queries';


export const WeatherForecastDisplay: FC = async () => {
  const data = await getWeatherForecasts()

  return (
    <WeatherCardsListProvider weatherResponse={data}>
      <div className="flex md:gap-0 bg-gray-900 min-h-screen 2xl:h-screen p-6 py-8 md:p-12 overflow-hidden">
        <CurrentCityWeather />
        <div className="w-full md:w-1/2 md:ml-[52%] lg:ml-[45%] lg:w-full xl:ml-[37%] 2xl:ml-[28%]">
          <WeatherHeader />
          <WeatherData />
        </div>
      </div>
    </WeatherCardsListProvider>
  );
};
