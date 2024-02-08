import { Dispatch, SetStateAction } from 'react';

import { FieldErrorsState } from '@/hooks';
import { upperCaseFirstLetter } from './upperCaseFirstLetter';

export const catchEmptyFields = <T>(
  data: T,
  fields: (keyof T & string)[],
  setFieldsError: Dispatch<SetStateAction<FieldErrorsState<T>>>,
): boolean => {
  let isError = false;

  fields.forEach((field) => {
    const fieldValue = data[field];

    if (!fieldValue) {
      setFieldsError((prevState) => ({
        ...prevState,
        [field]: `${upperCaseFirstLetter(field)} must be provided!`,
      }));
      isError = true;
    } else {
      setFieldsError((prevState) => ({
        ...prevState,
        [field]: '',
      }));
    }
  });

  return isError;
};
