'use client';

import { useEffect, useState } from 'react';

import { useInputCompleteQuery } from '@/hooks/common';

import { DEBOUNCE_DELAY } from '../constants';
import { extractData, getCitiesQueryVariables } from '../utils';

import { CitiesDocument, CitiesQuery, CitiesQueryVariables } from './queries';

export type City = {
  name: string;
  country: string;
};

type HookReturn = {
  data: City[];
  loading: boolean;
};

export const useCityInputAutocomplete = (city: string): HookReturn => {
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
