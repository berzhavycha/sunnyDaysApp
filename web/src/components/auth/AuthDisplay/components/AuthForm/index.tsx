'use client';

import { faEnvelope, faKey, faLock } from '@fortawesome/free-solid-svg-icons';
import { joiResolver } from '@hookform/resolvers/joi';
import { BaseSyntheticEvent, FC, useTransition } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/common';
import { useCurrentUser } from '@/context';
import { auth } from '@/services/auth';
import { AuthType, SearchParams, UserDto } from '@/shared';

import { userSchema } from '../../validation';
import { SubmitButton } from '../SubmitButton';

type Props = {
  authType: AuthType;
  searchParams: SearchParams;
};

export const AuthForm: FC<Props> = ({ authType, searchParams }) => {
  const [isPending, startTransition] = useTransition();
  const { fetchUser } = useCurrentUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDto>({
    mode: 'onSubmit',
    resolver: joiResolver(userSchema(authType)),
  });

  const authWithParams = auth.bind(null, authType);
  const [authState, authAction] = useFormState(authWithParams, {
    fieldsError: {
      email: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit((data: UserDto, e?: BaseSyntheticEvent) => {
    e?.preventDefault();

    startTransition(() => {
      authAction(data);
    });

    if (Object.values(authState.fieldsError).every((field) => !field)) {
      fetchUser();
    }
  });

  const inputStyles = 'bg-slate-200  pl-9 md:pl-10 md:pl-12 sm:text-sm md:text-lg xl:text-xl';
  const inputIconStyles = 'top-8 md:top-12 md:text-md md:text-xl';

  return (
    <>
      <div className="text-xs mb-2 text-center text-red-500 mt-2 h-2 md:mb-4 md:text-md">
        {authState?.fieldsError.unexpectedError || searchParams.error}
      </div>
      <form className="mt-4" onSubmit={onSubmit}>
        <Input
          {...register('email')}
          label="Email:"
          placeholder="Enter your email"
          error={errors.email?.message ?? authState?.fieldsError.email ?? ''}
          icon={faEnvelope}
          className={inputStyles}
          iconStyles={inputIconStyles}
          autoComplete="off"
        />
        <Input
          {...register('password')}
          label="Password:"
          placeholder="Enter your password"
          error={errors.password?.message ?? authState?.fieldsError.password ?? ''}
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
            error={errors?.confirmPassword?.message ?? authState?.fieldsError.confirmPassword ?? ''}
            icon={faKey}
            className={inputStyles}
            iconStyles={inputIconStyles}
            autoComplete="off"
            isSecured
          />
        )}
        <SubmitButton isPending={isPending} text={authType} />
      </form>
    </>
  );
};
