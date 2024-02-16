import { useState, useEffect } from 'react';

import { useInputCompleteQuery } from '@/hooks/common';
import { DEBOUNCE_DELAY } from './constants';
import { getCitiesQueryVariables, extractData } from './utils';
import { CitiesDocument, CitiesQuery, CitiesQueryVariables } from './queries';

export type City = {
  name: string;
};

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

  const { data, loading } = useInputCompleteQuery<CitiesQuery, City, CitiesQueryVariables>(
    CitiesDocument,
    debouncedCity,
    getCitiesQueryVariables(debouncedCity),
    extractData,
  );

  return { data, loading };
};
