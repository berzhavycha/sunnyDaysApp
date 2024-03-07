import React from 'react';

import { Header, WeatherCard } from './components';


export const WeatherCardList = (): JSX.Element => {
    return (
        <div className=''>
            <Header />
            <div className="w-full flex gap-6 flex-wrap">
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