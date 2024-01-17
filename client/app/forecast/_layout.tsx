import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../context';

export default function AppLayout() {
    const { authState } = useAuth()
    console.log(authState)

    if (!authState.accessToken) {
        return <Redirect href="/login/" />;
    }

    return <Stack />;
}
