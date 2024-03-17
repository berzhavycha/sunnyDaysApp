'use client';

import { FC, useTransition } from 'react';
import { faEnvelope, faKey, faLock } from '@fortawesome/free-solid-svg-icons';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { DocumentNode } from '@apollo/client';

import { AuthType, UserDto, useAuth } from '@/hooks';
import { Input } from '@/components/common';
import { userSchema } from './validation';
import { SubmitButton } from './components';

type Props = {
  title: string;
  subtitle: string;
  authType: AuthType;
  authMutation: DocumentNode;
};

export const AuthForm: FC<Props> = ({ title, authType, subtitle, authMutation }) => {
  const { authHandler, fieldsError } = useAuth(authMutation);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDto>({
    mode: 'onSubmit',
    resolver: joiResolver(userSchema(authType)),
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data: UserDto): Promise<void> => {
    startTransition(() => {
      authHandler(data);
    });
  };

  return (
    <>
      <div className="flex h-full flex-col justify-center p-6">
        <h1 className="text-4xl text-blue-900 text-center mb-4 font-bold">{title}</h1>
        <p className="text-sm text-blue-900 text-center mb-2">{subtitle}</p>
        <div className="text-md text-center text-red-500 mt-2 mb-4 h-2">
          {fieldsError.unexpectedError}
        </div>
        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register('email')}
            label="Email:"
            placeholder="Enter your email"
            error={errors.email?.message ?? fieldsError.email ?? ''}
            icon={faEnvelope}
          />
          <Input
            {...register('password')}
            label="Password:"
            placeholder="Enter your password"
            error={errors.password?.message ?? fieldsError.password ?? ''}
            icon={faLock}
            isSecured
          />
          {authType === AuthType.SIGN_UP && (
            <Input
              {...register('confirmPassword')}
              label="Confirm Password:"
              placeholder="Enter confirm password"
              error={errors?.confirmPassword?.message ?? fieldsError.confirmPassword ?? ''}
              icon={faKey}
              isSecured
            />
          )}
          <SubmitButton isPending={isPending} text={authType} />
        </form>
      </div>
    </>
  );
};
