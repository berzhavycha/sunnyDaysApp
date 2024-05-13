import { AuthType } from "@/shared";
import { signInMutation, signUpMutation } from "./actions/auth/mutations";

export const authMutations: Record<AuthType, string> = {
  signIn: signInMutation,
  signUp: signUpMutation
}