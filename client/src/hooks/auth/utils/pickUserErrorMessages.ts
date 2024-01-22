import { UserDto } from '@/hooks';
import { FieldErrorsState } from '../useSign'

export const pickUserErrorMessages = (inputErrorMessages: string[]): FieldErrorsState<UserDto> => {
  const fieldErrors = {
    email: '',
    password: '',
  };

  inputErrorMessages.forEach((error) => {
    if (error.toLocaleLowerCase().includes('email') && !fieldErrors.email) {
      fieldErrors.email = error;
    } else if (error.toLocaleLowerCase().includes('password') && !fieldErrors.password) {
      fieldErrors.password = error;
    }
  });

  return fieldErrors;
};
