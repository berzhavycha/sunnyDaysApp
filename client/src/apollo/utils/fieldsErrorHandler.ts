import { ApolloError } from "@apollo/client";
import { FieldErrors } from "@/app/(auth)/sign-up";
import { pickErrorMessages } from "./pickErrorMessages";

export const fieldsErrorHandler = (errors: ApolloError): FieldErrors => {
  let fieldsError: FieldErrors = {
    email: "",
    password: "",
  };

  errors.graphQLErrors.forEach((graphQLError) => {
    if (graphQLError.extensions?.code === "BAD_REQUEST" && graphQLError.extensions?.originalError?.message) {
      const inputErrorMessages = graphQLError.extensions.originalError.message as string[];
      fieldsError = pickErrorMessages(inputErrorMessages);
    } else if (graphQLError.extensions?.code === "INTERNAL_SERVER_ERROR" && graphQLError.message) {
      const inputErrorMessage = graphQLError.message;
      fieldsError = pickErrorMessages([inputErrorMessage]);
    }
  });

  return fieldsError;
};
