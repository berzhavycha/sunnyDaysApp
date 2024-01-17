import { Stack } from 'expo-router';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../../apollo'
import { AuthProvider } from '../../context';


export default function Layout() {
    return (
        <ApolloProvider client={apolloClient}>
            <AuthProvider>
                <Stack>
                    <Stack.Screen name="login/index" options={{ headerShown: false }} />
                    <Stack.Screen name="sign-up/index" options={{ headerShown: false }} />
                </Stack>
            </AuthProvider>
        </ApolloProvider>
    )
}