'use client'

import { UserCitiesWeatherQuery } from "@/services";
import { processResponse } from "@/shared";
import { useState, useEffect } from "react";

type HookReturn = {
    weatherData?: UserCitiesWeatherQuery
}

export const useParseWeatherData = (weatherResponse: string): HookReturn => {
    const [weatherData, setWeatherData] = useState<UserCitiesWeatherQuery | undefined>(
        JSON.parse(weatherResponse)?.data,
    );

    useEffect(() => {
        processResponse({
            jsonResponse: weatherResponse,
            onSuccess: setWeatherData,
        });
    }, [weatherResponse])

    return { weatherData }
}