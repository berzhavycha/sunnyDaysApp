import { FC } from 'react';

import { WeatherForecastDisplay } from '@/components/weatherForecast/WeatherForecastDisplay';
import { env } from '@/core/env';

export const revalidate = env.NEXT_PUBLIC_WEATHER_FORECAST_CACHE_SECONDS_TIME

const WeatherForecast: FC = () => {
  return <WeatherForecastDisplay />;
};

export default WeatherForecast;
