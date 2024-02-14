import { useState } from 'react';
import { ApolloError, DocumentNode, useMutation } from '@apollo/client';

import { useCurrentUser } from '@/context';
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
  authHandler: (userDto: UserDto) => Promise<void>;
  loading: boolean;
  fieldsError: FieldErrorsState<UserDto>
};

export const useAuth = (
  mutation: DocumentNode = SignInDocument,
): AuthHookReturnType => {
  const [fieldsError, setFieldsError] = useState<FieldErrorsState<UserDto>>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [authMutation, { loading }] = useMutation(mutation);
  const { setCurrentUser } = useCurrentUser();

  const authHandler = async (userDto: UserDto): Promise<void> => {
    try {
      const { data } = await authMutation({
        variables: {
          userDto: {
            email: userDto.email,
            password: userDto.password,
          },
        },
      });

      setFieldsError({ email: '', password: '', confirmPassword: '' });

      setCurrentUser(data);
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
    fieldsError
  };
};
