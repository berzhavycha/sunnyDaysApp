import React from 'react';
import { TodayWeatherInfo } from './components/TodayWeatherInfo';
import { Forecast } from './components/Forecast';

type Props = {
    // Define your props here
};

export const CurrentCityWeather: React.FC<Props> = () => {
    return (
        <div className='w-1/4 flex flex-col gap-5 bg-blue-800 rounded-3xl p-5'>
            <TodayWeatherInfo
                city={'Lviv'}
                celsius={24}
                fahrenheit={100}
                text={'Drizzle'}
                wind={'25 km/h'}
                humidity={'80%'}
                smog={'124'}
            />
            <Forecast
                info={[
                    { text: 'Drizzle', celsius: 25, fahrenheit: 60, day: 'Monday' },
                    { text: 'Drizzle', celsius: 25, fahrenheit: 60, day: 'Monday' },
                    { text: 'Drizzle', celsius: 25, fahrenheit: 60, day: 'Monday' }
                ]}
            />
            <button className='text-center border border-red-500 w-full rounded-xl text-red-400 p-2 transition hover:bg-red-500 hover:text-white'>Delete City</button>
        </div>
    );
};