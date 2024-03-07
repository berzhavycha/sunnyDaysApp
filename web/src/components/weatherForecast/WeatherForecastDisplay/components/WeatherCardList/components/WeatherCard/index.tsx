import React from 'react';

import Image from 'next/image';
import { TemperatureInfo } from '@/components';
import { SubWeatherForecast } from '../SubWeatherForecast';
import { WeatherForecast } from '@/hooks';

export const WeatherCard: React.FC<WeatherForecast> = ({ city, celsius, text, daysForecast }) => {
    return (
        <div className='w-[32%] p-4 pb-5 bg-blue-600 rounded-3xl cursor-pointer hover:shadow-[0_0px_15px_5px_rgba(66,165,245,0.4)] transition-shadow'>
            <div className="flex justify-between items-center mb-6">
                <div className="flex flex-col gap-2 text-left">
                    <p className='text-white text-md'>{city}</p>
                    <TemperatureInfo value={celsius} tempSign='°C' size='medium' fontWeight='normal' />
                    <p className='text-white text-sm mb-2'>{text}</p>
                </div>
                <Image src={'https://cdn-icons-png.flaticon.com/512/4834/4834559.png'} width={120} height={120} alt={''} />
            </div>
            <div className="flex justify-between items-center gap-4">
                {daysForecast.map((item, index) => {
                    return (
                        <SubWeatherForecast key={index} {...item} />
                    )
                })}
            </div>
        </div>
    );
};
