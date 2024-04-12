'use client';

import { ApolloError, DocumentNode, useMutation } from '@apollo/client';
import { useState } from 'react';

import { useCurrentUser } from '@/context';
import { START_PAGE_NUMBER, fieldsErrorHandler } from '@/shared';

import { pickUserErrorMessages } from '../utils';

import { SignInDocument } from './mutations';
import { env } from '@/core/env';
import { useSearchParams, useRouter } from 'next/navigation';

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
  const router = useRouter();
  const searchParams = useSearchParams();
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


      const page = searchParams.get('page') ?? START_PAGE_NUMBER;
      const limit = searchParams.get('perPage') ?? env.NEXT_PUBLIC_WEATHER_CITIES_LIMIT;
      const order = searchParams.get('order') ?? env.NEXT_PUBLIC_WEATHER_CITIES_ORDER;

      
      setFieldsError({ email: '', password: '', confirmPassword: '' });
      setCurrentUser(data);

      router.replace(`/weather-forecast?page=${page}&perPage=${limit}&order=${order}`);
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
