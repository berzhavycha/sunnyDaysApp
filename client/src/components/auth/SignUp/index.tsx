import { AuthType, useSignUp } from '@/hooks';
import { Spinner } from '@/components/common';
import { AuthForm } from '../AuthForm'

export const SignUp = (): JSX.Element => {
  const { loading, signUpHandler, fieldsError } = useSignUp();

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <AuthForm
          title="Create New Account"
          subTitle="Please fill in the form to continue"
          fieldsError={fieldsError}
          onAuth={signUpHandler}
          authType={AuthType.SIGN_UP}
        />
      )}
    </>
  );
};
