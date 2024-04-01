import { FC } from 'react';

import { AuthForm } from '@/components';
import { AuthType, SignInDocument } from '@/hooks';

const SignInScreen: FC = () => {
  return (
    <AuthForm title="Welcome Back!" authType={AuthType.SIGN_IN} authMutation={SignInDocument} />
  );
};

export default SignInScreen;
