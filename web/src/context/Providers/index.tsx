import { FC, PropsWithChildren } from 'react';

import { ProtectedLayout } from '@/layouts';
import { ApolloWrapper } from '../ApolloWrapper';
import { CurrentUserProvider } from '../CurrentUser';
import { CitySearchListProvider } from '../CitySearchList';
import { CurrentTempUnitProvider } from '../CurrentTempUnit';
import { SubscriptionErrorProvider } from '../SubscriptionError';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ApolloWrapper>
      <CurrentUserProvider>
        <ProtectedLayout>
          <CitySearchListProvider>
            <CurrentTempUnitProvider>
              <SubscriptionErrorProvider>
                {children}
              </SubscriptionErrorProvider>
            </CurrentTempUnitProvider>
          </CitySearchListProvider>
        </ProtectedLayout>
      </CurrentUserProvider>
    </ApolloWrapper>
  );
};
