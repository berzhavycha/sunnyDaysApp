import { FC, PropsWithChildren } from 'react';
import Image from 'next/image';

import weatherIcon from '@/assets/images/weather-icon.png';
import { AuthWelcome } from './components';

export const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex w-full bg-gray-900 justify-center items-center h-screen">
      <div className="flex w-[65%] h-3/4 bg-white rounded-3xl text-center">
        <div className="flex h-full bg-gradient-to-r from-blue-800 to-blue-950 flex-col shadow-[0_35px_60px_15px_rgba(0,0,0,0.4)] justify-center items-center w-1/2 p-6 rounded-3xl rounded-tr-[230px] rounded-br-[150px]">
          <Image src={weatherIcon} alt="Weather-Icon" width={100} height={100} className="mb-4" priority />
          <AuthWelcome />
        </div>
        <div className="w-1/2 p-6">{children}</div>
      </div>
    </div>
  );
};
