import React, { useState } from 'react';
import { AuthType, useSignUp } from '@/hooks';
import { Spinner, AuthForm } from '@/components';

const SignUpScreen = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const { loading, signUpHandler, fieldsError } = useSignUp();

  if (loading) {
    return <Spinner />;
  }

  const fields = {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    fieldsError,
  };

  return (
    <AuthForm
      title="Create New Account"
      subTitle="Please fill in the form to continue"
      fields={fields}
      handleAuth={async () => await signUpHandler(email, password, confirmPassword)}
      actionButtonText={AuthType.SIGN_UP}
    />
  );
};

export default SignUpScreen;
