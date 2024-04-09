import { FC } from 'react';

import { ControlButtons, WeatherCityInput } from './components';
import { getCitiesByPrefix, getCitySearchStatus } from '@/services/index-server';
import { CitySearchListProvider } from '@/context';

export const WeatherHeader: FC = async () => {
  const citySearchData = await getCitiesByPrefix()
  const citySearchStatusData = await getCitySearchStatus()

  return (
    <CitySearchListProvider citySearchStatusData={citySearchStatusData}>
      <header className="w-full flex flex-col gap-0 mb-4 items-baseline sm:mb-0 sm:flex-row sm:gap-6 sm:justify-between md:max-xl:flex-col md:max-xl:gap-0 xl:justify-between xl:flex-row">
        <WeatherCityInput data={citySearchData.data?.citiesByPrefix} />
        <ControlButtons />
      </header>
    </CitySearchListProvider>
  );
};
