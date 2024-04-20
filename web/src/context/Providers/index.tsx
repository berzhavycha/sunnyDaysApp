import { FC, PropsWithChildren } from 'react';

import { Compose } from '@/components';

import { ApolloWrapper } from '../ApolloWrapper';
import { CurrentTempUnitProvider } from '../CurrentTempUnit';
import { CurrentUserProvider } from '../CurrentUser';
import { SubscriptionErrorProvider } from '../SubscriptionError';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Compose
      components={[
        ApolloWrapper,
        CurrentUserProvider,
        SubscriptionErrorProvider,
        CurrentTempUnitProvider,
      ]}
    >
      {children}
    </Compose>
  );
};
