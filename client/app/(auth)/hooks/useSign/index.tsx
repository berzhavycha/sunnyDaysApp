import { ApolloError, DocumentNode, useMutation } from "@apollo/client"
import { useAuth } from "../../../../context"
import { Dispatch, SetStateAction } from "react"
import { fieldsErrorHandler } from "../../utils"
import { FieldErrors } from "../../sign-up"
import { useRouter } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"

export interface userDto {
    email: string,
    password: string
}

export const useSign = (mutation: DocumentNode, setFieldsError: Dispatch<SetStateAction<FieldErrors>>) => {
    const router = useRouter()
    const [signUpMutation, { loading, error }] = useMutation(mutation)
    const { setAuthState } = useAuth()

    const handleAuth = async (userDto: userDto) => {
        try {
            const { data } = await signUpMutation({
                variables: {
                    userDto,
                },
            });

            const { accessToken, refreshToken } = data.signUp

            setAuthState(prevState => ({
                ...prevState,
                accessToken,
                refreshToken
            }));

            await AsyncStorage.setItem('tokens', JSON.stringify({ accessToken, refreshToken }))

            setFieldsError({ email: '', password: '', confirmPassword: '' });
            router.replace('/forecast/')
        } catch (error) {
            if (error instanceof ApolloError) {
                const fieldErrors = fieldsErrorHandler(error)
                setFieldsError(prevState => ({
                    ...prevState,
                    ...fieldErrors
                }));
            }
        }
    };

    return {
        loading,
        error,
        handleAuth
    }
}