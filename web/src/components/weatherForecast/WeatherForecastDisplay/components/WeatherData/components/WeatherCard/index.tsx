import { WeatherForecast } from '@/shared';

import { InteractiveWeatherCard, WeatherCardInfo } from './components';

export const WeatherCard = (props: WeatherForecast): JSX.Element => {
  return (
    <InteractiveWeatherCard {...props}>
      <WeatherCardInfo {...props} />
    </InteractiveWeatherCard>
  );
};
