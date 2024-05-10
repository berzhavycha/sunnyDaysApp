import { FC } from 'react';

import { AuthDisplay } from '@/components';
import { AuthType, } from '@/hooks';
import { SearchParams } from '@/shared';

type Props = {
  searchParams: SearchParams
}

const SignUp: FC<Props> = ({ searchParams }) => {
  return (
    <AuthDisplay
      title="Create Your Account"
      subtitle="Please fill your information below"
      authType={AuthType.SIGN_UP}
      searchParams={searchParams}
    />
  );
};

export default SignUp;
