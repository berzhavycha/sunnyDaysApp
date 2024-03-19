import { FC, PropsWithChildren } from 'react';
import Image from 'next/image';

import weatherIcon from '@/assets/images/weather-icon.png';
import { AuthWelcome } from './components';

export const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex w-full bg-gray-900 justify-center py-8 md:py-0 items-center h-screen overflow-hidden">
      <div className="flex h-[95%] flex-col md:flex-row w-[90%] xl:w-[65%] md:h-3/4 bg-white rounded-3xl text-center">
        <div className="w-full flex h-full bg-gradient-to-r from-blue-800 to-blue-950 flex-col md:shadow-[0_35px_60px_15px_rgba(0,0,0,0.4)] justify-center items-center md:w-1/2 p-6 rounded-3xl rounded-br-[230px] rounded-bl-[230px] md:rounded-tr-[230px] md:rounded-br-[150px] md:rounded-bl-3xl">
          <Image
            src={weatherIcon}
            alt="Weather-Icon"
            width={100}
            height={100}
            className="mb-4 w-12 h-12 sm:w-20 sm:h-20 lg:w-28 lg:h-28"
            priority
          />
          <AuthWelcome />
        </div>
        <div className="w-full md:w-1/2 px-6">{children}</div>
      </div>
    </div>
  );
};
