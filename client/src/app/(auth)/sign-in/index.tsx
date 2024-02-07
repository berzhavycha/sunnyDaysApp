import { useState } from 'react';
import { Spinner, AuthForm } from '@/components';
import { AuthType, useAuth, FieldErrorsState, UserDto } from '@/hooks';

const SignInScreen = (): JSX.Element => {
  const [fieldsError, setFieldsError] = useState<FieldErrorsState<UserDto>>({
    email: '',
    password: '',
  });
  const { loading, authHandler } = useAuth(setFieldsError);

  return (
    <>
      {
        loading ?
          <Spinner />
          :
          <AuthForm
            title="Welcome Back"
            fieldsError={fieldsError}
            onAuth={authHandler}
            authType={AuthType.SIGN_IN}
          />
      }
    </>
  );
};

export default SignInScreen;
