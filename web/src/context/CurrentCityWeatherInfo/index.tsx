'use client';

import { WeatherForecast } from '@/hooks';
import { FC, createContext, PropsWithChildren, useContext, useState, Dispatch, SetStateAction } from 'react';

type CurrentCityWeatherInfoState = {
    info: WeatherForecast & {
        dayOfWeek?: string
    }
};

type ContextType = {
    currentCityWeatherInfo: CurrentCityWeatherInfoState | null;
    setCurrentCityWeatherInfo: Dispatch<SetStateAction<CurrentCityWeatherInfoState | null>>;
};

const CurrentCityWeatherContext = createContext<ContextType | null>(null);

export const useCurrentCityWeatherInfo = (): ContextType => {
    const context = useContext(CurrentCityWeatherContext);

    if (!context) {
        throw new Error('useCurrentCityWeatherInfo must be used within an CurrentCityWeatherInfoProvider');
    }

    return context;
};

export const CurrentCityWeatherInfoProvider: FC<PropsWithChildren> = ({ children }) => {
    const [currentCityWeatherInfo, setCurrentCityWeatherInfo] = useState<CurrentCityWeatherInfoState | null>(null);

    const contextValue: ContextType = {
        currentCityWeatherInfo,
        setCurrentCityWeatherInfo
    };

    return (
        <CurrentCityWeatherContext.Provider value={contextValue}>
            {children}
        </CurrentCityWeatherContext.Provider>
    );
};
