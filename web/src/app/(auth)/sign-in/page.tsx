import { FC } from 'react';

import { AuthDisplay } from '@/components';
import { AuthType, SignInDocument } from '@/hooks';
import { SearchParams } from '@/shared';

type Props = {
  searchParams: SearchParams
}

const SignIn: FC<Props> = ({ searchParams }) => {
  return (
    <AuthDisplay
      title="Sign In"
      subtitle="Nice to see you again!"
      authType={AuthType.SIGN_IN}
      authMutation={SignInDocument}
      searchParams={searchParams}
    />
  );
};

export default SignIn;
