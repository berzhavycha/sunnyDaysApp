'use client';

import { DocumentNode } from '@apollo/client';
import { faEnvelope, faKey, faLock } from '@fortawesome/free-solid-svg-icons';
import { joiResolver } from '@hookform/resolvers/joi';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/common';
import { AuthType, useAuth, UserDto } from '@/hooks';

import { SubmitButton } from './components';
import { userSchema } from './validation';

type Props = {
  title: string;
  subtitle: string;
  authType: AuthType;
  authMutation: DocumentNode;
};

export const AuthForm: FC<Props> = ({ title, authType, subtitle, authMutation }) => {
  const { authHandler, fieldsError, loading } = useAuth(authMutation);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDto>({
    mode: 'onSubmit',
    resolver: joiResolver(userSchema(authType)),
  });

  const onSubmit = async (data: UserDto): Promise<void> => {
    await authHandler(data);
  };

  const inputStyles = 'pl-9 md:pl-10 md:pl-12 sm:text-sm md:text-lg xl:text-xl';
  const inputIconStyles = 'top-8 md:top-12 md:text-md md:text-xl';

  return (
    <>
      <div className="flex h-full flex-col justify-center p-6">
        <h1 className="text-xl mb-2 text-blue-900 text-center font-bold md:mb-4 md:text-4xl">
          {title}
        </h1>
        <p className="text-xs mb-1 text-blue-900 text-center md:mb-2 md:text-lg">{subtitle}</p>
        <div className="text-xs mb-2 text-center text-red-500 mt-2 h-2 md:mb-4 md:text-md">
          {fieldsError.unexpectedError}
        </div>
        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register('email')}
            label="Email:"
            placeholder="Enter your email"
            error={errors.email?.message ?? fieldsError.email ?? ''}
            icon={faEnvelope}
            className={inputStyles}
            iconStyles={inputIconStyles}
            autoComplete="off"
          />
          <Input
            {...register('password')}
            label="Password:"
            placeholder="Enter your password"
            error={errors.password?.message ?? fieldsError.password ?? ''}
            icon={faLock}
            className={inputStyles}
            iconStyles={inputIconStyles}
            autoComplete="off"
            isSecured
          />
          {authType === AuthType.SIGN_UP && (
            <Input
              {...register('confirmPassword')}
              label="Confirm Password:"
              placeholder="Enter confirm password"
              error={errors?.confirmPassword?.message ?? fieldsError.confirmPassword ?? ''}
              icon={faKey}
              className={inputStyles}
              iconStyles={inputIconStyles}
              autoComplete="off"
              isSecured
            />
          )}
          <SubmitButton isPending={loading} text={authType} />
        </form>
      </div>
    </>
  );
};
