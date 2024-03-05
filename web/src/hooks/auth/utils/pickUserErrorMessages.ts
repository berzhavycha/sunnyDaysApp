import { UserDto } from '@/hooks';
import { UNEXPECTED_ERROR_MESSAGE } from '@/graphql';
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
      fieldErrors.unexpectedError = UNEXPECTED_ERROR_MESSAGE;
    }
  });

  return fieldErrors;
};
