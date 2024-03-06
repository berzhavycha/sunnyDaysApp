import React from 'react';

import { Header, WeatherCard } from './components';


export const WeatherCardList = (): JSX.Element => {
    return (
        <div className='ml-96 pl-10'>
            <Header />
            <div className="w-full flex gap-5 flex-wrap">
                <WeatherCard />
                <WeatherCard />
                <WeatherCard />
                <WeatherCard />
                <WeatherCard />
                <WeatherCard />
            </div>
        </div>
    );
};