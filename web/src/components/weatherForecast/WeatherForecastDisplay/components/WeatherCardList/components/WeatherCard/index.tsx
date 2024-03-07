import React from 'react';

import Image from 'next/image';
import { TemperatureInfo } from '@/components';
import { SubWeatherForecast } from '../SubWeatherForecast';

type Props = {
    city: string;
};

export const WeatherCard: React.FC<Props> = () => {
    return (
        <div className='w-[32%] p-4 pb-5 bg-blue-600 rounded-3xl cursor-pointer hover:shadow-[0_0px_15px_5px_rgba(66,165,245,0.4)] transition-shadow'>
            <div className="flex justify-between items-center mb-6">
                <div className="flex flex-col gap-2 text-left">
                    <p className='text-white text-md'>Lviv</p>
                    <TemperatureInfo value={25} tempSign='°C' size='medium' fontWeight='normal' />
                    <p className='text-white font-light text-sm mb-2'>Overcast</p>
                </div>
                <Image src={'https://cdn-icons-png.flaticon.com/512/4834/4834559.png'} width={120} height={120} alt={''} />
            </div>
            <div className="flex justify-between items-center gap-4">
                <SubWeatherForecast value={25} tempSign='°C' />
                <SubWeatherForecast value={25} tempSign='°C' />
                <SubWeatherForecast value={25} tempSign='°C' />
            </div>
        </div>
    );
};
