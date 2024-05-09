import { DocumentNode } from '@apollo/client';
import { FC, Suspense } from 'react';

import { AuthType } from '@/hooks';

import { AuthForm } from './components';
import { Spinner } from '@/components/common';

type Props = {
  title: string;
  subtitle: string;
  authType: AuthType;
  authMutation: DocumentNode;
};

export const AuthDisplay: FC<Props> = ({ title, authType, subtitle, authMutation }) => {
  return (
    <>
      <div className="flex h-full flex-col justify-center p-6">
        <h1 className="text-xl mb-2 text-blue-900 text-center font-bold md:mb-4 md:text-4xl">
          {title}
        </h1>
        <p className="text-xs mb-1 text-blue-900 text-center md:mb-2 md:text-lg">{subtitle}</p>
        {/*https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout*/}
        <Suspense fallback={<Spinner />}>
          <AuthForm authType={authType} authMutation={authMutation} />
        </Suspense>
      </div>
    </>
  );
};
