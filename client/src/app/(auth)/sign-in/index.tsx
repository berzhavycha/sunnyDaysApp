import { useState } from 'react';
import { Spinner, AuthForm } from '@/components';
import { AuthType, useAuth, FieldErrorsState, UserDto } from '@/hooks';

const SignInScreen = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fieldsError, setFieldsError] = useState<FieldErrorsState<UserDto>>({
    email: '',
    password: '',
  });
  const { loading, authHandler } = useAuth(setFieldsError, AuthType.SIGN_IN);

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
      handleAuth={async () => await authHandler({ email, password })}
      actionButtonText={AuthType.SIGN_IN}
    />
  );
};

export default SignInScreen;
