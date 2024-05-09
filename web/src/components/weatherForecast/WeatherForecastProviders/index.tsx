import { FC, PropsWithChildren, Suspense } from 'react';

import { Compose, Spinner } from '@/components/common';
import { WeatherPaginationInfoProvider } from '@/context';

import { TempUnitProviders, WeatherResponseProviders } from './providers';

export const WeatherForecastProviders: FC<PropsWithChildren> = async ({ children }) => {
  return (
    <>
      {/*https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout*/}
      <Suspense fallback={<Spinner />}>
        <Compose
          components={[TempUnitProviders, WeatherPaginationInfoProvider, WeatherResponseProviders]}
        >
          {children}
        </Compose>
      </Suspense>
    </>
  );
};
