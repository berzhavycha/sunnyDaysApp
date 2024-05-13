'use client'

import { UserCitiesWeatherQuery } from "@/services";
import { getApolloErrorMessage, processResponse } from "@/shared";
import { ApolloError } from "@apollo/client";
import { useState, useEffect } from "react";

type HookReturn = {
    error: string;
    weatherData?: UserCitiesWeatherQuery
}

export const useParseWeatherData = (weatherResponse: string): HookReturn => {
    const [weatherData, setWeatherData] = useState<UserCitiesWeatherQuery | undefined>(
        JSON.parse(weatherResponse)?.data,
    );
    const [error, setError] = useState<string>('')

    const onError = (error: ApolloError | Error): void => setError(getApolloErrorMessage(error))


    useEffect(() => {
        processResponse({
            jsonResponse: weatherResponse,
            onSuccess: setWeatherData,
            onError,
        });
    }, [weatherResponse])

    return { error, weatherData }
}