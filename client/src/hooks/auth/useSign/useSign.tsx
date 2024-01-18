import { ApolloError, DocumentNode, useMutation } from "@apollo/client";
import { useAuth } from "@/context";
import { Dispatch, SetStateAction } from "react";
import { fieldsErrorHandler } from "@/apollo";
import { FieldErrors } from "@/app/(auth)/sign-up";
import * as SecureStore from "expo-secure-store";
import { ResponseSignType } from "./constants";

export interface userDto {
  email: string;
  password: string;
}

export interface IUseSign {
  loading: boolean;
  error: ApolloError | undefined;
  handleAuth: (userDto: userDto) => Promise<void>;
}

export const useSign = (
  mutation: DocumentNode,
  setFieldsError: Dispatch<SetStateAction<FieldErrors>>,
  signType: ResponseSignType,
): IUseSign => {
  const [signMutation, { loading, error }] = useMutation(mutation);
  const { setAuthState } = useAuth();

  const handleAuth = async (userDto: userDto): Promise<void> => {
    try {
      const { data } = await signMutation({
        variables: {
          userDto,
        },
      });

      const { accessToken, refreshToken } = data[signType];

      await SecureStore.setItemAsync("tokens", JSON.stringify({ accessToken, refreshToken }));

      setFieldsError({ email: "", password: "", confirmPassword: "" });

      setAuthState({
        accessToken,
        refreshToken,
        authenticated: true,
      });
    } catch (error) {
      if (error instanceof ApolloError) {
        const fieldErrors = fieldsErrorHandler(error);
        setFieldsError((prevState) => ({
          ...prevState,
          ...fieldErrors,
        }));
      }
    }
  };

  return {
    loading,
    error,
    handleAuth,
  };
};
