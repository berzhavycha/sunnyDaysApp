import { FC, PropsWithChildren } from 'react';

import { Compose } from '@/components';

import { CurrentUserProvider } from '../CurrentUser';
import { CookieTempUnitProvider } from '../CurrentTempUnit';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Compose components={[CurrentUserProvider, CookieTempUnitProvider]}>
      {children}
    </Compose>
  );
};
