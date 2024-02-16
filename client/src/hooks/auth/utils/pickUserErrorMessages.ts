import { UserDto } from '@/hooks';
import { FieldErrorsState } from '../useAuth';

export const pickUserErrorMessages = (inputErrorMessages: string[]): FieldErrorsState<UserDto> => {
  const fieldErrors = {
    email: '',
    password: '',
    unexpectedError: '',
  };

  inputErrorMessages.forEach((error) => {
    if (error.toLocaleLowerCase().includes('email') && !fieldErrors.email) {
      fieldErrors.email = error;
    } else if (error.toLocaleLowerCase().includes('password') && !fieldErrors.password) {
      fieldErrors.password = error;
    } else {
      fieldErrors.unexpectedError = error;
    }
  });

  return fieldErrors;
};
