import { useState } from "react";
import { Spinner, AuthForm } from "@/components";
import { AuthType, useSign } from "@/hooks";
import { SIGN_IN_MUTATION } from "@/apollo";
import { FieldErrors } from "../sign-up";

const SignInScreen = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fieldsError, setFieldsError] = useState<FieldErrors>({
    email: "",
    password: "",
  });
  const { loading, handleAuth } = useSign(
    SIGN_IN_MUTATION,
    setFieldsError,
    AuthType.SIGN_IN,
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
      actionButtonText={AuthType.SIGN_IN}
    />
  );
};

export default SignInScreen;
