'use client';

import { UserCitiesWeatherQuery } from '@/hooks/weatherForecast/useWeatherData/queries';
import { MOCKED_WEATHER_CARD } from '@/shared';
import {
    FC,
    createContext,
    PropsWithChildren,
    useContext,
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
} from 'react';

type ContextType = {
    isAddingCard: boolean;
    setIsAddingCard: (isAdding: boolean) => void;
    weatherData: UserCitiesWeatherQuery | null
    setWeatherData: Dispatch<SetStateAction<UserCitiesWeatherQuery | null>>
};

const WeatherCardsListContext = createContext<ContextType | null>(null);

export const useWeatherCardsList = (): ContextType => {
    const context = useContext(WeatherCardsListContext);

    if (!context) {
        throw new Error(
            'useWeatherCardsList must be used within an  WeatherCardsListProvider',
        );
    }

    return context;
};

export const WeatherCardsListProvider: FC<PropsWithChildren> = ({ children }) => {
    const [weatherData, setWeatherData] = useState<UserCitiesWeatherQuery | null>(null);
    const [isAddingCard, setIsAddingCard] = useState<boolean>(false)

    useEffect(() => {
        if (isAddingCard) {
            setWeatherData(prevData => {
                const updatedEdges = [...(prevData?.userCitiesWeather.edges ?? [])];

                updatedEdges.push({
                    ...MOCKED_WEATHER_CARD,
                    _loading: true,
                });

                return {
                    ...prevData,
                    userCitiesWeather: {
                        ...(prevData?.userCitiesWeather ?? { paginationInfo: { totalCount: 0 } }),
                        edges: updatedEdges
                    }
                };
            });
        }
    }, [isAddingCard]);


    const contextValue: ContextType = {
        isAddingCard,
        setIsAddingCard,
        weatherData,
        setWeatherData
    };

    return (
        <WeatherCardsListContext.Provider value={contextValue}>
            {children}
        </WeatherCardsListContext.Provider>
    );
};
