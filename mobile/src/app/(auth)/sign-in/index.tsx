import { AuthForm } from '@/components';
import { AuthType } from '@/hooks';
import { SignInDocument } from '@/hooks/auth/useAuth/mutations';

const SignInScreen = (): JSX.Element => {
  return (
    <AuthForm title="Welcome Back!" authType={AuthType.SIGN_IN} authMutation={SignInDocument} />
  );
};

export default SignInScreen;
