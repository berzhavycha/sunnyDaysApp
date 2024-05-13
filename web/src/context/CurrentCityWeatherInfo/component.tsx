import { withWeatherData } from '@/components/hocs';

import { CurrentCityWeatherInfoProvider } from './components';

export const CurrentCityWeatherInfo = withWeatherData(CurrentCityWeatherInfoProvider);
