import { useState } from "react";
import { Spinner, AuthForm } from "@/components";
import { AuthType, useSign } from "@/hooks";
import { LOGIN_MUTATION } from "@/apollo";
import { FieldErrors } from "../sign-up";

const LoginScreen = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fieldsError, setFieldsError] = useState<FieldErrors>({
    email: "",
    password: "",
  });
  const { loading, handleAuth } = useSign(
    LOGIN_MUTATION,
    setFieldsError,
    AuthType.LOGIN,
  );

  if (loading) {
    return <Spinner />;
  }

  const fields = {
    email,
    setEmail,
    password,
    setPassword,
    fieldsError,
  };

  return (
    <AuthForm
      title="Welcome Back"
      fields={fields}
      handleAuth={async () => await handleAuth({ email, password })}
      actionButtonText="Login"
    />
  );
};

export default LoginScreen;
