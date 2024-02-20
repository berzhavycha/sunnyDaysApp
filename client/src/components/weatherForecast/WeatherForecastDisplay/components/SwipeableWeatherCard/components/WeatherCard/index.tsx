import { memo, FC } from 'react';
import { View, Text, Image } from 'react-native';

import { useCurrentTempUnit } from '@/context';
import { weatherIconMapping } from '@/components/weatherForecast/constants';
import { WeatherForecast } from '@/hooks';
import { SubWeatherForecastDay } from '../SubWeatherForecastDay';
import { pickWeatherIcon } from '../../utils';
import { tempUnitSigns } from '@/context/CurrentTempUnit/constants';

type Props = {
  info: WeatherForecast
}

export const WeatherCard: FC<Props> = memo(({ info }) => {
  const { currentTempUnit } = useCurrentTempUnit()
  const { city, text, humidity, daysForecast } = info

  const weatherIcon = pickWeatherIcon(text);

  return (
    <View className="flex p-4 pt-2 mb-4 items-center bg-blue-800 rounded-xl">
      <View className="w-full flex-row justify-between mb-2">
        <View className="flex w-[60%]">
          <Text className="text-[38px] mb-2 font-bold text-white">{info[currentTempUnit.name]} {tempUnitSigns[currentTempUnit.name]}</Text>
          <Text className="text-xs mb-1 text-white">{text}</Text>
          <Text className="text-xs text-white mb-2">Precipitation: {humidity}%</Text>
          <Text className="text-[20px] font-bold text-white">{city}</Text>
        </View>
        <Image
          source={{ uri: weatherIconMapping[weatherIcon] }}
          style={{ width: 112, height: 112 }}
        />
      </View>
      <View className="w-full mt-2 flex-row justify-between">
        {daysForecast.map((dayForecast, index) => {
          return <SubWeatherForecastDay key={index} info={dayForecast} />;
        })}
      </View>
    </View>
  );
},
);
