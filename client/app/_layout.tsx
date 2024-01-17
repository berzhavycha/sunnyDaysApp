import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../apollo'
import { AuthProvider } from '../context';
import { Slot } from 'expo-router';

export default function Root() {
    return (
        <ApolloProvider client={apolloClient}>
            <AuthProvider>
                <Slot />
            </AuthProvider>
        </ApolloProvider>
    );
}