import { ApolloError, DocumentNode, useMutation } from "@apollo/client"
import { useAuth } from "../../../../context"
import { Dispatch, SetStateAction, useState } from "react"
import { fieldsErrorHandler } from "../../utils"
import { FieldErrors } from "../../sign-up"

export interface userDto {
    email: string,
    password: string
}

export const useSign = (mutation: DocumentNode, setFieldsError: Dispatch<SetStateAction<FieldErrors>>) => {
    const [signUpMutation, { loading, error }] = useMutation(mutation)
    const { setAuthState } = useAuth()

    const handleAuth = async (userDto: userDto) => {
        try {
            const { data } = await signUpMutation({
                variables: {
                    userDto,
                },
            });

            console.log(data)

            setAuthState(prevState => ({
                ...prevState,
                accessToken: data.signUp.accessToken,
                refreshToken: data.signUp.refreshToken
            }));

            setFieldsError({ email: '', password: '', confirmPassword: '' });
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