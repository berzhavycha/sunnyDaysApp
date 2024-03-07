import React from 'react';

import Image from 'next/image';
import { TemperatureInfo } from '@/components';

type Props = {
    value: number;
    tempSign: string;
};

export const SubWeatherForecast: React.FC<Props> = ({ value, tempSign }) => {
    return (
        <div className="w-1/3 text-center">
            <div className="w-full mb-2 flex flex-col items-center justify-between bg-gradient-to-t from-blue-800 to-blue-600 rounded-xl p-2 text-center relative">
                <Image src={'https://cdn-icons-png.flaticon.com/512/4834/4834559.png'} width={60} height={60} alt={''} className='absolute top-[-24px] left-1/5' />
                <div className="mt-9 ml-[-10px]">
                    <TemperatureInfo value={value} tempSign={tempSign} size='small' fontWeight='normal'/>
                </div>
            </div>
            <p className='text-white text-[12px]'>Monday</p>
        </div>
    );
};