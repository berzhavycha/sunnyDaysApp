import { AuthType } from "@/hooks";
import { Dispatch, SetStateAction } from "react";

export interface AuthFormProps {
  title: string;
  subTitle?: string;
  fields: {
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
    confirmPassword?: string;
    setConfirmPassword?: Dispatch<SetStateAction<string>>;
    fieldsError: {
      email: string;
      password: string;
      confirmPassword?: string;
    };
  };
  handleAuth: () => Promise<void>;
  actionButtonText: AuthType;
}
