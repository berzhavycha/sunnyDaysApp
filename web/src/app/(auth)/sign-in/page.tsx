import { FC } from 'react';

import { AuthDisplay } from '@/components';
import { AuthType, SearchParams } from '@/shared';

type Props = {
  searchParams: SearchParams;
};

const SignIn: FC<Props> = ({ searchParams }) => {
  return (
    <AuthDisplay
      title="Sign In"
      subtitle="Nice to see you again!"
      authType={AuthType.SIGN_IN}
      searchParams={searchParams}
    />
  );
};

export default SignIn;
