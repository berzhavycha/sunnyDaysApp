import { ComponentType } from 'react';

import { getWeatherForecasts } from '@/services';

type PropsProvidedByHOC = {
  weatherResponse: string;
};

export function withWeatherData<P extends PropsProvidedByHOC>(WrappedComponent: ComponentType<P>) {
  return async (props: Omit<P, keyof PropsProvidedByHOC>): Promise<JSX.Element> => {
    const weatherResponse = await getWeatherForecasts();

    return <WrappedComponent {...(props as P)} weatherResponse={JSON.stringify(weatherResponse)} />;
  };
}
