import { AuthType, FieldErrorsState, UserDto } from '@/hooks';
import { Dispatch, SetStateAction } from 'react';

export type AuthFormProps = {
  title: string;
  subTitle?: string;
  fields: {
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
    confirmPassword?: string;
    setConfirmPassword?: Dispatch<SetStateAction<string>>;
    fieldsError: FieldErrorsState<UserDto>;
  };
  handleAuth: () => Promise<void>;
  actionButtonText: AuthType;
};
