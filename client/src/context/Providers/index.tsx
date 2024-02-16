import { FC, PropsWithChildren } from 'react';
import { ApolloProvider } from '@apollo/client';
import { EventProvider } from 'react-native-outside-press';

import { CitySearchListProvider } from '../CitySearchList';
import { CurrentUserProvider } from '../CurrentUser';
import { SubscriptionErrorProvider } from '../SubscriptionError';
import { apolloClient } from '@/graphql';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
    return (
        <ApolloProvider client={apolloClient}>
            <CurrentUserProvider>
                <CitySearchListProvider>
                    <SubscriptionErrorProvider>
                        <EventProvider>
                            {children}
                        </EventProvider>
                    </SubscriptionErrorProvider>
                </CitySearchListProvider>
            </CurrentUserProvider>
        </ApolloProvider>
    );
};
