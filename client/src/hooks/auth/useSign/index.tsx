import { Dispatch, SetStateAction } from 'react';
import { ApolloError, DocumentNode, useMutation } from '@apollo/client';
import { useAuth } from '@/context';
import * as SecureStore from 'expo-secure-store';
import { AuthType } from '../constants';
import { catchEmptyFields, fieldsErrorHandler } from '@/utils';
import { pickUserErrorMessages } from '../utils';

export type UserDto = {
  email: string;
  password: string;
  confirmPassword?: string;
};

export type FieldErrorsState<T> = {
  [key in keyof T]?: string;
};

export type SignHookReturnType = {
  loading: boolean;
  handleAuth: (userDto: UserDto) => Promise<void>;
};

export const useSign = (
  mutation: DocumentNode,
  setFieldsError: Dispatch<SetStateAction<FieldErrorsState<UserDto>>>,
  signType: AuthType,
): SignHookReturnType => {
  const [signMutation, { loading }] = useMutation(mutation);
  const { setAuthState } = useAuth();

  const handleAuth = async (userDto: UserDto): Promise<void> => {
    try {
      if (catchEmptyFields(userDto, Object.keys(userDto) as (keyof UserDto)[], setFieldsError)) {
        return;
      }

      const { data } = await signMutation({
        variables: {
          userDto,
        },
      });

      const { accessToken, refreshToken } = data[signType];

      await SecureStore.setItemAsync('tokens', JSON.stringify({ accessToken, refreshToken }));

      setFieldsError({ email: '', password: '', confirmPassword: '' });

      setAuthState({
        accessToken,
        refreshToken,
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
    handleAuth,
  };
};
