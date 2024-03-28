import { FC } from 'react';

import { Providers } from '@/context';
import { InitialLayout } from '../InitialLayout';

export const MainLayout: FC = () => {
  return (
    <Providers>
      <InitialLayout />
    </Providers>
  );
};
