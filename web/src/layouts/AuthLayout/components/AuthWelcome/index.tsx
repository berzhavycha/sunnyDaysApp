'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { convertPathToPascal } from '@/shared';

export const AuthWelcome = (): JSX.Element => {
  const pathname = usePathname();
  const altPath = pathname === '/sign-in' ? '/sign-up' : '/sign-in';

  const signInMessage = pathname === '/sign-in' ? 'Welcome Back!' : 'Welcome to Sunny Day!';
  const signUpMessage = altPath === '/sign-in' ? 'Have an account?' : 'Don`t have an account?';

  return (
    <>
      <h1 className="text-lg mb-1 md:text-2xl lg:text-4xl font-bold md:mb-4 text-white">
        {signInMessage}
      </h1>
      <p className="text-xs mb-3 md:text-sm lg:text-lg md:mb-6 text-white font-light">
        Enter your personal details to use all of the site features
      </p>
      <p className="text-sm md:text-xl text-white mb-4 font-bold">{signUpMessage}</p>
      <Link
        className="w-36 py-2 text-center rounded-xl border border-blue-500 text-white text-xs md:text-lg hover:bg-blue-500 transition-all"
        href={altPath}
      >
        {convertPathToPascal(altPath)}
      </Link>
    </>
  );
};
