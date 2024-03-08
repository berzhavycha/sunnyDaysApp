'use client';

import { WeatherForecast } from '@/hooks';
import { FC, createContext, PropsWithChildren, useContext, useState, Dispatch, SetStateAction, useEffect } from 'react';

type InfoType = WeatherForecast & {
    dayOfWeek?: string
}

type CurrentCityWeatherInfoState = {
    info: InfoType
};

type ContextType = {
    currentCityWeatherInfo: CurrentCityWeatherInfoState | undefined;
    setCurrentCityWeatherInfo: Dispatch<SetStateAction<CurrentCityWeatherInfoState | undefined>>;
    isTodayCurrentWeather: boolean;
    setIsTodayCurrentWeather: Dispatch<SetStateAction<boolean>>;
    setTodayWeatherCityInfo: Dispatch<SetStateAction<InfoType | undefined>>
    onTodayCurrentWeather: () => void
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
    const [todayCityWeatherInfo, setTodayWeatherCityInfo] = useState<InfoType>()
    const [currentCityWeatherInfo, setCurrentCityWeatherInfo] = useState<CurrentCityWeatherInfoState>();
    const [isTodayCurrentWeather, setIsTodayCurrentWeather] = useState<boolean>(true)

    useEffect(() => {
        if (currentCityWeatherInfo?.info.city) {
            setTodayWeatherCityInfo(currentCityWeatherInfo.info)
        }
    }, [currentCityWeatherInfo?.info.city])

    const onTodayCurrentWeather = (): void => {
        if (todayCityWeatherInfo) {
            setIsTodayCurrentWeather(true)
            setCurrentCityWeatherInfo({ info: todayCityWeatherInfo })
        }
    }

    const contextValue: ContextType = {
        currentCityWeatherInfo,
        setCurrentCityWeatherInfo,
        isTodayCurrentWeather,
        setIsTodayCurrentWeather,
        setTodayWeatherCityInfo,
        onTodayCurrentWeather
    };

    return (
        <CurrentCityWeatherContext.Provider value={contextValue}>
            {children}
        </CurrentCityWeatherContext.Provider>
    );
};
