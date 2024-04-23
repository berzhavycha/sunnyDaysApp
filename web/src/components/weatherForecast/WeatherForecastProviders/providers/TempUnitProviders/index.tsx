import { FC, PropsWithChildren } from 'react';

import { CurrentTempUnitProvider } from '@/context';

// GitHub issue - https://github.com/vercel/next.js/issues/49757#issuecomment-1894910792
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { cookies } = require('next/headers');

export const TempUnitProviders: FC<PropsWithChildren> = ({ children }) => {
  const cookieTempUnit = cookies().get('current-temp-unit');

  return (
    <CurrentTempUnitProvider cookieTempUnit={cookieTempUnit?.value}>
      {children}
    </CurrentTempUnitProvider>
  );
};
