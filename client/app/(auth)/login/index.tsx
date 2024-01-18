import { useState } from 'react';
import { Spinner, AuthForm } from '@/components';
import { useSign } from '@/hooks';
import { FieldErrors } from '../sign-up';
import { LOGIN_MUTATION } from '@/apollo';

const LoginScreen = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [fieldsError, setFieldsError] = useState<FieldErrors>({
        email: '',
        password: '',
    })
    const { loading, handleAuth } = useSign(LOGIN_MUTATION, setFieldsError, "signIn")

    if (loading) { return <Spinner /> }

    const fields = {
        email,
        setEmail,
        password,
        setPassword,
        fieldsError,
    };


    return (
        <AuthForm
            title={'Welcome Back'}
            fields={fields}
            handleAuth={async () => await handleAuth({ email, password })}
            actionButtonText={'Login'}
        />
    );
};

export default LoginScreen;
