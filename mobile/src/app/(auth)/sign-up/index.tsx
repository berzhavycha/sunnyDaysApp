import { FC } from 'react';

import { AuthForm } from '@/components';
import { AuthType } from '@/hooks';
import { SignUpDocument } from '@/hooks/auth/useAuth/mutations';

const SignUpScreen: FC = () => {
  return (
    <AuthForm
      title="Create New Account"
      subTitle="Please fill in the form to continue"
      authType={AuthType.SIGN_UP}
      authMutation={SignUpDocument}
    />
  );
};

export default SignUpScreen;
