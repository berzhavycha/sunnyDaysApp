import { FC, PropsWithChildren } from 'react';

import { Compose } from '@/components';

import { CookieTempUnitProvider } from '../CurrentTempUnit';
import { CurrentUserProvider } from '../CurrentUser';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return <Compose components={[CurrentUserProvider, CookieTempUnitProvider]}>{children}</Compose>;
};
