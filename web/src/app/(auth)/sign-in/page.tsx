import { AuthForm } from '@/components';
import { AuthType } from '@/hooks';
import { SignInDocument } from '@/hooks/auth/useAuth/mutations';

const SignIn = (): JSX.Element => {
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