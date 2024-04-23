import { FC } from 'react';

import { CitySearchListProvider } from '@/context';
import { getCitySearchStatus } from '@/services/index-server';

import { ControlButtons, WeatherCitySearch } from './components';

export const WeatherHeader: FC = async () => {
  const citySearchStatus = await getCitySearchStatus();

  return (
    <header className="w-full flex flex-col gap-0 mb-4 items-baseline sm:mb-0 sm:flex-row sm:gap-6 sm:justify-between md:max-xl:flex-col md:max-xl:gap-0 xl:justify-between xl:flex-row">
      <CitySearchListProvider citySearchStatus={JSON.stringify(citySearchStatus)}>
        <WeatherCitySearch />
        <ControlButtons />
      </CitySearchListProvider>
    </header>
  );
};
