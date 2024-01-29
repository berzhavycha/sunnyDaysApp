import { Dispatch, SetStateAction } from 'react';
import { ApolloError, DocumentNode, useMutation } from '@apollo/client';
import { useAuthManager } from '@/context';
import { catchEmptyFields, fieldsErrorHandler } from '@/utils';
import { pickUserErrorMessages } from '../utils';
import { SIGN_IN_MUTATION } from './mutations';

export type UserDto = {
  email: string;
  password: string;
  confirmPassword?: string;
};

export type FieldErrorsState<T> = {
  [key in keyof T]?: string;
};

export type AuthHookReturnType = {
  loading: boolean;
  authHandler: (userDto: UserDto) => Promise<void>;
};

export const useAuth = (
  setFieldsError: Dispatch<SetStateAction<FieldErrorsState<UserDto>>>,
  mutation: DocumentNode = SIGN_IN_MUTATION,
): AuthHookReturnType => {
  const [signMutation, { loading }] = useMutation(mutation);
  const { setAuthState } = useAuthManager();

  const authHandler = async (userDto: UserDto): Promise<void> => {
    try {
      if (catchEmptyFields(userDto, Object.keys(userDto) as (keyof UserDto)[], setFieldsError)) {
        return;
      }

      await signMutation({
        variables: {
          userDto,
        },
      });

      setFieldsError({ email: '', password: '', confirmPassword: '' });

      setAuthState({
        isAuthenticated: true,
      });
    } catch (error) {
      if (error instanceof ApolloError) {
        console.log(error.stack)
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