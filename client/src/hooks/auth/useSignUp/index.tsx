import { useState } from 'react';
import { AuthType } from '../constants';
import { SIGN_UP_MUTATION } from '@/apollo';
import { FieldErrorsState, UserDto, useAuth } from '../useAuth';

export type SignUpHookReturnType = {
    loading: boolean;
    signUpHandler: (email: string, password: string, confirmPassword: string) => Promise<void>;
    fieldsError: FieldErrorsState<UserDto>
};

export const useSignUp = (): SignUpHookReturnType => {
    const [fieldsError, setFieldsError] = useState<FieldErrorsState<UserDto>>({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const { loading, authHandler } = useAuth(SIGN_UP_MUTATION, setFieldsError, AuthType.SIGN_UP);

    const signUpHandler = async (email: string, password: string, confirmPassword: string): Promise<void> => {
        if (confirmPassword !== password) {
            setFieldsError((prevState) => ({
                ...prevState,
                confirmPassword: 'Passwords doesn`t match',
            }));
            return;
        } else {
            setFieldsError((prevState) => ({
                ...prevState,
                confirmPassword: '',
            }));
        }
        await authHandler({ email, password });
    };


    return {
        loading,
        signUpHandler,
        fieldsError
    };
};
