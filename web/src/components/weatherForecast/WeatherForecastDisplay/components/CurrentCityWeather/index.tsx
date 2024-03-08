'use client'

import React, { useEffect, useState } from 'react';
import { TodayWeatherInfo } from './components/TodayWeatherInfo';
import { Forecast } from './components/Forecast';
import { useCurrentCityWeatherInfo } from '@/context';
import { daysOfWeek } from '@/shared';

export const CurrentCityWeather = (): JSX.Element => {
    const [dayOfWeek, setDayOfWeek] = useState<string>('')
    const [time, setTime] = useState<string>('')
    const { currentCityWeatherInfo } = useCurrentCityWeatherInfo()

    useEffect(() => {
        if (currentCityWeatherInfo?.info.dayOfWeek) {
            setDayOfWeek(currentCityWeatherInfo?.info.dayOfWeek)
        } else {
            const dateInstance = new Date(currentCityWeatherInfo?.info.time ?? '');
            const dayOfWeek = daysOfWeek[dateInstance.getDay()];
            setDayOfWeek(dayOfWeek)
            setTime(`${dateInstance.getHours()}:${dateInstance.getMinutes()}`)
        }

    }, [currentCityWeatherInfo])


    return (
        <div className='w-1/4 flex flex-col gap-5 bg-blue-800 rounded-3xl p-5'>
            {!currentCityWeatherInfo ? (
                <h1>No Data</h1>
            ) : (
                <>
                    <TodayWeatherInfo
                        city={currentCityWeatherInfo?.info.city}
                        celsius={currentCityWeatherInfo?.info.celsius}
                        fahrenheit={currentCityWeatherInfo?.info.fahrenheit}
                        text={currentCityWeatherInfo?.info.text}
                        windSpeed={currentCityWeatherInfo?.info.windSpeed}
                        humidity={currentCityWeatherInfo?.info.humidity}
                        precip={currentCityWeatherInfo?.info.precip}
                        dayOfWeek={dayOfWeek}
                        time={time}
                    />
                    <Forecast
                        info={currentCityWeatherInfo.info.daysForecast}
                    />
                    <button className='text-center border border-red-500 w-full rounded-xl text-red-400 p-2 transition hover:bg-red-500 hover:text-white'>Delete City</button>
                </>
            )}
        </div>
    );
};