import { useState } from 'react';
import { ApolloError, DocumentNode, useMutation } from '@apollo/client';

import { useCurrentUser } from '@/context';
import { fieldsErrorHandler } from '@/shared';
import { pickUserErrorMessages } from '../utils';
import { SignInDocument } from './mutations';

export type UserDto = {
  email: string;
  password: string;
  confirmPassword?: string;
};

export type FieldErrorsState<T> = {
  [key in keyof T]: string;
} & {
  unexpectedError?: string;
};

type HookReturn = {
  authHandler: (userDto: UserDto) => Promise<void>;
  loading: boolean;
  fieldsError: FieldErrorsState<UserDto>;
};

export const useAuth = (mutation: DocumentNode = SignInDocument): HookReturn => {
  const [fieldsError, setFieldsError] = useState<FieldErrorsState<UserDto>>({
    email: '',
    password: '',
    confirmPassword: '',
    unexpectedError: '',
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
    fieldsError,
  };
};
