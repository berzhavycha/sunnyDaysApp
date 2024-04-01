import React, { FC } from 'react';
import { View } from 'react-native';

import { WeatherForecastDays } from '@/hooks';
import { useRenderSubForecast } from './hooks';
import { CustomSwiper } from '@/components/common';
import { Env } from '@/env';

type Props = {
  forecasts?: WeatherForecastDays[];
};

export const ForecastSlider: FC<Props> = ({ forecasts }) => {
  const { renderItem } = useRenderSubForecast();

  return (
    <View className="w-full h-full">
      <CustomSwiper
        data={forecasts ?? []}
        renderItem={renderItem}
        itemsPerPage={Env.FORECAST_DAYS_PER_SLIDE}
        showPagination
      />
    </View>
  );
};
