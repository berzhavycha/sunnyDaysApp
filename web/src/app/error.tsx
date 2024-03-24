'use client';

import { FC } from 'react';

import { ErrorBoundary } from '@/components';

export type ErrorBoundaryProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const Error: FC<ErrorBoundaryProps> = ({ error, reset }): JSX.Element => {
  return <ErrorBoundary error={error} reset={reset} />;
};

export default Error;
