'use server'

import { ApolloError } from '@apollo/client';
import { redirect} from 'next/navigation';

import { AuthType, FieldErrorsState, NODE_ENV, ONE_DAY_MILLISECONDS, UserDto, fieldsErrorHandler, getPaginationParams } from '@/shared';

import { authUser, pickUserErrorMessages } from './utils';

import { env } from '@/core/env';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { UNEXPECTED_ERROR_MESSAGE } from '@/graphql';

// GitHub issue - https://github.com/vercel/next.js/issues/49757#issuecomment-1894910792
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { cookies } = require('next/headers');

type AuthState = {
  fieldsError: FieldErrorsState<UserDto>
}

const unexpectedErrorState = {
  email: '',
  password: '',
  unexpectedError: UNEXPECTED_ERROR_MESSAGE
}

export const auth = async (authType: AuthType, prevState: AuthState, formData: UserDto): Promise<AuthState> => {
  try {
    const tokens = await authUser(authType, formData)

    if (tokens) {
      cookies().set('tokens', tokens, {
        httpOnly: true,
        maxAge: ONE_DAY_MILLISECONDS * env.COOKIE_EXPIRATION_DAYS_TIME,
        sameSite: 'lax',
        secure: env.NODE_ENV === NODE_ENV.production,
      })

      const { page, paginationOptions } = getPaginationParams();
      const path = `/weather-forecast?page=${page}&perPage=${paginationOptions.limit}&order=${paginationOptions.order}`
      redirect(path);
    } else {
      return {
        fieldsError: unexpectedErrorState
      }
    }
  } catch (error) {
    if (error instanceof ApolloError) {
      const fieldErrors = fieldsErrorHandler<UserDto>(error, pickUserErrorMessages);
      return {
        ...prevState,
        fieldsError: {
          ...prevState.fieldsError,
          ...fieldErrors
        }
      }
    } else if (isRedirectError(error)) {
      throw error
    } else {
      return {
        fieldsError: unexpectedErrorState
      }
    }
  }
};

