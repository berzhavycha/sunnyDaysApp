import { Stack } from 'expo-router';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../../apollo'


export default function Layout() {
    return (
        <ApolloProvider client={apolloClient}>
            <Stack>
                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen name="sign-up" options={{ headerShown: false }} />
            </Stack>
        </ApolloProvider>
    )
}