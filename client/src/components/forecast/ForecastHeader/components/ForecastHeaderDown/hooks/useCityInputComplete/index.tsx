import { City, CityQuery, QueryVariables } from '../../interfaces';
import { GET_CITIES } from './mutations';
import { useInputCompleteQuery } from '@/hooks';
import { REACT_APP_GEODB_CLIENT_NAME } from '@env';
import { getCitiesQueryVariables, extractData } from '../../utils';
import { useState, useEffect } from 'react';
import { DEBOUNCE_DELAY } from '@/components/forecast/constants';

type UseCityInputCompleteReturn = {
    data: City[];
    loading: boolean;
};

export const useCityInputComplete = (city: string): UseCityInputCompleteReturn => {
    const [debouncedCity, setDebouncedCity] = useState<string>(city);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedCity(city);
        }, DEBOUNCE_DELAY);

        return () => {
            clearTimeout(timerId);
        };
    }, [city]);

    const { data, loading } = useInputCompleteQuery<CityQuery, City, QueryVariables>(
        GET_CITIES,
        debouncedCity,
        getCitiesQueryVariables(debouncedCity),
        { clientName: REACT_APP_GEODB_CLIENT_NAME },
        extractData
    );

    return { data, loading }
};
