import { FC } from 'react';

import { ControlButtons, WeatherCityInput } from './components';
import { getCitiesByPrefix } from '@/services/index-server';

export const WeatherHeader: FC = async () => {
  const citySearchData = await getCitiesByPrefix()

  return (
    <header className="w-full flex flex-col gap-0 mb-4 items-baseline sm:mb-0 sm:flex-row sm:gap-6 sm:justify-between md:max-xl:flex-col md:max-xl:gap-0 xl:justify-between xl:flex-row">
      <WeatherCityInput data={citySearchData.data?.citiesByPrefix} />
      <ControlButtons />
    </header>
  );
};
