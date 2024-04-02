import React, { FC, memo } from 'react';
import { View } from 'react-native';

import { CustomSwiper } from '@/components/common';
import { Env } from '@/env';
import { WeatherForecastDays } from '@/hooks';

import { useRenderSubForecast } from './hooks';

type Props = {
  forecasts?: WeatherForecastDays[];
};

export const ForecastSlider: FC<Props> = memo(({ forecasts }) => {
  const { renderItem } = useRenderSubForecast();

  const keyExtractor = (item: WeatherForecastDays): string => item.id

  return (
    <View className="w-full h-full">
      <CustomSwiper
        data={forecasts ?? []}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        itemsPerPage={Env.FORECAST_DAYS_PER_SLIDE}
        showPagination
      />
    </View>
  );
});
