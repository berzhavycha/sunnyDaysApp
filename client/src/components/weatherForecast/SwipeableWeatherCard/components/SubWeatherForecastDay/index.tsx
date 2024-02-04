import { memo, FC } from 'react';
import { View, Text, Image } from 'react-native';
import { weatherIconMapping } from '@/components/weatherForecast/constants';
import { pickWeatherIcon } from '@/components/weatherForecast/SwipeableWeatherCard/utils';
import { REACT_APP_MAX_FORECAST_DAYS } from '@env';

export type SubWeatherForecastDayProps = {
  text: string;
  dayOfWeek: string;
  tempCelsius: number;
  humidity: number;
}

export const SubWeatherForecastDay: FC<SubWeatherForecastDayProps> = memo(
  ({ text, dayOfWeek, tempCelsius, humidity }) => {
    const dayWeatherIcon = pickWeatherIcon(text);

    return (
      <View
        className={`w-[${Math.floor((1 / REACT_APP_MAX_FORECAST_DAYS) * 100 - 1)}%] justify-center items-center`}
      >
        <View className="w-full flex mb-2 justify-center items-center bg-blue-600 rounded-xl px-2 py-2">
          <Image
            source={{ uri: weatherIconMapping[dayWeatherIcon] }}
            style={{ width: 40, height: 40 }}
            className="mb-2 p-8"
          />
          <Text className="text-[16px] font-bold text-white">{tempCelsius}°C</Text>
          <Text className="text-xs text-white">{humidity}%</Text>
        </View>
        <Text className="text-gray-300 font-bold">{dayOfWeek}</Text>
      </View>
    );
  },
);
