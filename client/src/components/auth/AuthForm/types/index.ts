import { AuthType, FieldErrorsState, UserDto } from '@/hooks';

export type AuthFormProps = {
  title: string;
  subTitle?: string;
  fieldsError: FieldErrorsState<UserDto>;
  onAuth: (userDto: UserDto) => Promise<void>;
  authType: AuthType;
};
