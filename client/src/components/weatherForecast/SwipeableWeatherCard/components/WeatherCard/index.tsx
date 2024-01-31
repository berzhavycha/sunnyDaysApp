import React, { memo } from 'react';
import { View, Text, Image } from 'react-native';
import { SubWeatherForecastDay, SubWeatherForecastDayProps } from '../ForecastDay';

export interface WeatherCardProps {
  city: string;
  tempCelsius: string;
  humidity: string;
  text: string;
  daysForecast: SubWeatherForecastDayProps[];
  weatherImageUri: string;
}

export const WeatherCard: React.FC<WeatherCardProps> = memo(
  ({ city, tempCelsius, text, humidity, weatherImageUri, daysForecast }) => {
    return (
      <View className="flex p-4 pt-2 mb-4 items-center bg-blue-800 rounded-xl">
        <View className="w-full flex-row justify-between mb-2">
          <View className="flex">
            <Text className="text-[38px] mb-2 font-bold text-white">{tempCelsius}</Text>
            <Text className="text-xs mb-1 text-white">{text}</Text>
            <Text className="text-xs text-white mb-2">Precipitation: {humidity}</Text>
            <Text className="text-[20px] font-bold text-white">{city}</Text>
          </View>
          <Image source={{ uri: weatherImageUri }} style={{ width: 112, height: 112 }} />
        </View>
        <View className="w-full mt-2 flex-row justify-between">
          {daysForecast.map((dayForecast, index) => {
            return <SubWeatherForecastDay key={index} {...dayForecast} />;
          })}
        </View>
      </View>
    );
  },
);
