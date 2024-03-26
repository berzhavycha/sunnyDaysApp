import { FC } from 'react';

import { AuthForm } from '@/components';
import { AuthType } from '@/hooks';
import { SignInDocument } from '@/hooks/auth/useAuth/mutations';

const SignIn: FC = () => {
  return (
    <AuthForm
      title="Sign In"
      subtitle="Nice to see you again!"
      authType={AuthType.SIGN_IN}
      authMutation={SignInDocument}
    />
  );
};

export default SignIn;
