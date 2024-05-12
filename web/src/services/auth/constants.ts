import { signInMutation, signUpMutation } from "./actions";

export enum AuthType {
  SIGN_UP = 'signUp',
  SIGN_IN = 'signIn',
}


export const authMutations: Record<AuthType, string> = {
  signIn: signInMutation,
  signUp: signUpMutation
}