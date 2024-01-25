import React, { useState } from 'react';
import { AuthType, FieldErrorsState, UserDto, useSign } from '@/hooks';
import { Spinner, AuthForm } from '@/components';
import { SIGN_UP_MUTATION } from '@/apollo';

const SignUpScreen = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [fieldsError, setFieldsError] = useState<FieldErrorsState<UserDto>>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { loading, handleAuth } = useSign(SIGN_UP_MUTATION, setFieldsError, AuthType.SIGN_UP);

  const handleSignUp = async (): Promise<void> => {
    if (confirmPassword !== password) {
      setFieldsError((prevState) => ({
        ...prevState,
        confirmPassword: 'Passwords doesn`t match',
      }));
      return;
    } else {
      setFieldsError((prevState) => ({
        ...prevState,
        confirmPassword: '',
      }));
    }
    await handleAuth({ email, password });
  };

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
      handleAuth={handleSignUp}
      actionButtonText={AuthType.SIGN_UP}
    />
  );
};

export default SignUpScreen;
