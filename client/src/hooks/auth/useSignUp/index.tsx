import { useState } from 'react';
import { FieldErrorsState, UserDto, useAuth } from '../useAuth';
import { SignUpDocument } from './mutations';

export type SignUpHookReturn = {
  loading: boolean;
  signUpHandler: (userDto: UserDto) => Promise<void>;
  fieldsError: FieldErrorsState<UserDto>;
};

export const useSignUp = (): SignUpHookReturn => {
  const [fieldsError, setFieldsError] = useState<FieldErrorsState<UserDto>>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { loading, authHandler } = useAuth(setFieldsError, SignUpDocument);

  const signUpHandler = async (userDto: UserDto): Promise<void> => {
    const { email, password, confirmPassword } = userDto

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
    fieldsError,
  };
};
