import { FC, PropsWithChildren } from 'react';

import { Compose } from '@/components/common';
import { WeatherPaginationInfoProvider } from '@/context';

import { TempUnitProviders, WeatherResponseProviders } from './providers';

export const WeatherForecastProviders: FC<PropsWithChildren> = async ({ children }) => {
  return (
    <Compose
      components={[TempUnitProviders, WeatherPaginationInfoProvider, WeatherResponseProviders]}
    >
      {children}
    </Compose>
  );
};
