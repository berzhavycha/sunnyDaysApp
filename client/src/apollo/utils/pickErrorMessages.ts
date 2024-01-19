import { FieldErrors } from "@/app/(auth)/sign-up";

export const pickErrorMessages = (inputErrorMessages: string[]): FieldErrors => {
  const fieldErrors = {
    email: "",
    password: "",
  };

  inputErrorMessages.forEach((error) => {
    if (error.toLocaleLowerCase().includes("email") && !fieldErrors.email) {
      fieldErrors.email = error;
    } else if (error.toLocaleLowerCase().includes("password") && !fieldErrors.password) {
      fieldErrors.password = error;
    }
  });

  return fieldErrors;
};
