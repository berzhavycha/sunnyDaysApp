import { AuthForm } from '@/components';
import { AuthType } from '@/hooks';
import { SignUpDocument } from '@/hooks/auth/useAuth/mutations';

const SignUp = (): JSX.Element => {
    return (
        <AuthForm
            title="Create Your Account"
            subtitle="Please fill your information below"
            authType={AuthType.SIGN_UP}
            authMutation={SignUpDocument}
        />
    );
};

export default SignUp;