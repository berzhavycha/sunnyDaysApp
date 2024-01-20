import { Dispatch, SetStateAction } from "react";
import { upperCaseFirstLetter } from "./upperCaseFirstLetter";

export type FieldErrorsState<T> = {
  [key in keyof T]?: string;
};

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
    }
  });

  return isError;
};
