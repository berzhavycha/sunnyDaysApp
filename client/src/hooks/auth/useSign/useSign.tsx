import { ApolloError, DocumentNode, useMutation } from "@apollo/client";
import { useAuth } from "@/context";
import { Dispatch, SetStateAction } from "react";
import { fieldsErrorHandler } from "@/apollo";
import { FieldErrors } from "@/app/(auth)/sign-up";
import * as SecureStore from "expo-secure-store";
import { AuthType } from "./constants";

export interface userDto {
  email: string;
  password: string;
}

export interface IUseSign {
  loading: boolean;
  handleAuth: (userDto: userDto) => Promise<void>;
}

export const useSign = (
  mutation: DocumentNode,
  setFieldsError: Dispatch<SetStateAction<FieldErrors>>,
  signType: AuthType,
): IUseSign => {
  const [signMutation, { loading }] = useMutation(mutation);
  const { setAuthState } = useAuth();

  const handleAuth = async (userDto: userDto): Promise<void> => {
    try {
      console.log(userDto)
      const { data } = await signMutation({
        variables: {
          userDto
        },
      });

      const { accessToken, refreshToken } = data[signType];

      await SecureStore.setItemAsync("tokens", JSON.stringify({ accessToken, refreshToken }));

      setFieldsError({ email: "", password: "", confirmPassword: "" });

      setAuthState({
        accessToken,
        refreshToken,
        isAuthenticated: true,
      });
    } catch (error) {
      console.log(error);
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
    handleAuth,
  };
};
