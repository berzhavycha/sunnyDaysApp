import React from 'react';

import Image from 'next/image';

type Props = {
    city: string;
};

export const WeatherCard: React.FC<Props> = () => {
    return (
        <div className='w-[32%] p-4 pb-5 bg-blue-600 rounded-3xl'>
            <div className="flex justify-between items-center mb-4">
                <div className="flex flex-col gap-2 text-left">
                    <p className='text-white text-md'>Lviv</p>
                    <p className='text-4xl text-white relative'>{25}<span className='absolute top-[-10px] right-[-8px] text-[18px]'>°C</span></p>
                    <p className='text-white font-light text-sm mb-2'>Overcast</p>
                </div>
                <Image src={'https://cdn-icons-png.flaticon.com/512/4834/4834559.png'} width={120} height={120} alt={''} />
            </div>
            <div className="flex justify-between items-center gap-4">
                <div className="w-1/3 text-center">
                    <div className="mb-2 flex flex-col justify-between bg-gradient-to-t from-blue-800 to-blue-600 rounded-xl p-2 text-center relative">
                        <Image src={'https://cdn-icons-png.flaticon.com/512/4834/4834559.png'} width={60} height={60} alt={''} className='absolute top-[-20px] left-[16px]' />
                        <p className='mt-10 text-[22px] text-white relative ml-[-6px]'>{25}<span className='absolute top-[1px] right-[10px] text-[12px]'>°C</span></p>
                    </div>
                    <p className='text-white font-light text-[12px]'>Monday</p>
                </div>
                <div className="w-1/3 text-center">
                    <div className="mb-2 flex flex-col justify-between bg-gradient-to-t from-blue-800 to-blue-600 rounded-xl p-2 text-center relative">
                        <Image src={'https://cdn-icons-png.flaticon.com/512/4834/4834559.png'} width={60} height={60} alt={''} className='absolute top-[-20px] left-[16px]' />
                        <p className='mt-10 text-[22px] text-white relative ml-[-6px]'>{25}<span className='absolute top-[1px] right-[10px] text-[12px]'>°C</span></p>
                    </div>
                    <p className='text-white font-light text-[12px]'>Tuesday</p>
                </div>
                <div className="w-1/3 text-center">
                    <div className="mb-2 flex flex-col justify-between bg-gradient-to-t from-blue-800 to-blue-600 rounded-xl p-2 text-center relative">
                        <Image src={'https://cdn-icons-png.flaticon.com/512/4834/4834559.png'} width={60} height={60} alt={''} className='absolute top-[-20px] left-[16px]' />
                        <p className='mt-10 text-[22px] text-white relative ml-[-6px]'>{25}<span className='absolute top-[1px] right-[10px] text-[12px]'>°C</span></p>
                    </div>
                    <p className='text-white font-light text-[12px]'>Wednesday</p>
                </div>
            </div>
        </div>
    );
};