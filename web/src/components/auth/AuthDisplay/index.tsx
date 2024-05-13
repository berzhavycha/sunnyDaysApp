import { FC } from 'react';

import { AuthType, SearchParams } from '@/shared';

import { AuthForm } from './components';

type Props = {
  title: string;
  subtitle: string;
  authType: AuthType;
  searchParams: SearchParams;
};

export const AuthDisplay: FC<Props> = ({ title, authType, subtitle, searchParams }) => {
  return (
    <>
      <div className="flex h-full flex-col justify-center p-6">
        <h1 className="text-xl mb-2 text-blue-900 text-center font-bold md:mb-4 md:text-4xl">
          {title}
        </h1>
        <p className="text-xs mb-1 text-blue-900 text-center md:mb-2 md:text-lg">{subtitle}</p>
        <AuthForm authType={authType} searchParams={searchParams} />
      </div>
    </>
  );
};
