import { useState } from "react";
import { Spinner, AuthForm } from "@/components";
import { AuthType, useSign, FieldErrorsState, UserDto } from "@/hooks";
import { SIGN_IN_MUTATION } from "@/apollo";

const SignInScreen = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fieldsError, setFieldsError] = useState<FieldErrorsState<UserDto>>({
    email: "",
    password: "",
  });
  const { loading, handleAuth } = useSign(SIGN_IN_MUTATION, setFieldsError, AuthType.SIGN_IN);

  if (loading) {
    return <Spinner />;
  }

  const handleSignIn = async (): Promise<void> => {
    await handleAuth({ email, password });
  };

  const fields = {
    email,
    setEmail,
    password,
    setPassword,
    fieldsError,
  };

  return (
    <AuthForm title="Welcome Back" fields={fields} handleAuth={handleSignIn} actionButtonText={AuthType.SIGN_IN} />
  );
};

export default SignInScreen;
