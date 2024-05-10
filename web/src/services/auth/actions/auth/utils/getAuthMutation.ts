import { AuthType } from "@/hooks";
import { signInMutation, signUpMutation } from "../mutations";

export const getAuthMutation = (authType: AuthType): string => {
    return authType === AuthType.SIGN_IN ? signInMutation : signUpMutation
}