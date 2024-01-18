import { ApolloError, DocumentNode, useMutation } from "@apollo/client"
import { useAuth } from "../../../context"
import { Dispatch, SetStateAction } from "react"
import { fieldsErrorHandler } from "../../../apollo/utils"
import { FieldErrors } from "../../../app/(auth)/sign-up"
import { useRouter } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"

export interface userDto {
    email: string,
    password: string
}

export const useSign = (mutation: DocumentNode, setFieldsError: Dispatch<SetStateAction<FieldErrors>>, signType: "signIn" | "signUp") => {
    const router = useRouter()
    const [signMutation, { loading, error }] = useMutation(mutation)
    const { setAuthState } = useAuth()

    const handleAuth = async (userDto: userDto) => {
        try {
            const { data } = await signMutation({
                variables: {
                    userDto,
                },
            });
            console.log('DATA:', data)

            const { accessToken, refreshToken } = data[signType]

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