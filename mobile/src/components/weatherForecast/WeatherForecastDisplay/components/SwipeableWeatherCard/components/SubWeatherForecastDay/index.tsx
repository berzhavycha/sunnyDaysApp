import { memo, FC } from 'react';
import { View, Text, Image } from 'react-native';

import { useCurrentTempUnit } from '@/context';
import { weatherIconMapping } from '@/components/weatherForecast/constants';
import { tempUnitSigns } from '@/context/CurrentTempUnit/constants';
import { WeatherForecastDays } from '@/hooks';
import { pickWeatherIcon } from '../../utils';

type Props = {
  info: WeatherForecastDays;
};

export const SubWeatherForecastDay: FC<Props> = memo(({ info }) => {
  const { text, humidity, dayOfWeek } = info;
  const { currentTempUnit } = useCurrentTempUnit();

  const dayWeatherIcon = pickWeatherIcon(text);

  return (
    <View className="w-[95%] justify-center items-center">
      <View className="w-full flex mb-2 justify-center items-center bg-blue-600 rounded-xl px-2 py-2">
        <Image
          source={{ uri: weatherIconMapping[dayWeatherIcon] }}
          style={{ width: 40, height: 40 }}
          className="mb-2 p-8"
        />
        <Text className="text-[16px] font-bold text-white">
          {info[currentTempUnit.name]} {tempUnitSigns[currentTempUnit.name]}
        </Text>
        <Text className="text-xs text-white">{humidity}%</Text>
      </View>
      <Text className="text-gray-300 font-bold">{dayOfWeek}</Text>
    </View>
  );
});
