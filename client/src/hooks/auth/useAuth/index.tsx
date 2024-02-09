import { Dispatch, SetStateAction } from 'react';
import { ApolloError, DocumentNode, useMutation } from '@apollo/client';

import { useAuthManager } from '@/context';
import { fieldsErrorHandler } from '@/utils';
import { pickUserErrorMessages } from '../utils';
import { SignInDocument } from './mutations';

export type UserDto = {
  email: string;
  password: string;
  confirmPassword?: string;
};

export type FieldErrorsState<T> = {
  [key in keyof T]: string;
};

export type AuthHookReturnType = {
  loading: boolean;
  authHandler: (userDto: UserDto) => Promise<void>;
};

export const useAuth = (
  setFieldsError: Dispatch<SetStateAction<FieldErrorsState<UserDto>>>,
  mutation: DocumentNode = SignInDocument,
): AuthHookReturnType => {
  const [authMutation, { loading }] = useMutation(mutation);
  const { setAuthState } = useAuthManager();

  const authHandler = async (userDto: UserDto): Promise<void> => {
    try {
      await authMutation({
        variables: {
          userDto: {
            email: userDto.email,
            password: userDto.password,
          },
        },
      });

      setFieldsError({ email: '', password: '', confirmPassword: '' });

      setAuthState({
        isAuthenticated: true,
      });
    } catch (error) {
      if (error instanceof ApolloError) {
        const fieldErrors = fieldsErrorHandler<UserDto>(error, pickUserErrorMessages);
        setFieldsError((prevState) => ({
          ...prevState,
          ...fieldErrors,
        }));
      }
    }
  };

  return {
    loading,
    authHandler,
  };
};
