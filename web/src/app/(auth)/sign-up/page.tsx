import { FC } from 'react';

import { AuthDisplay } from '@/components';
import { AuthType, SignUpDocument } from '@/hooks';

const SignUp: FC = () => {
  return (
    <AuthDisplay
      title="Create Your Account"
      subtitle="Please fill your information below"
      authType={AuthType.SIGN_UP}
      authMutation={SignUpDocument}
    />
  );
};

export default SignUp;
