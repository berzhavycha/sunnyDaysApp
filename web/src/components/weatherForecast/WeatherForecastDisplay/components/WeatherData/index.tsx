import { FC } from 'react';

import { CustomFlatList, NoData } from '@/components/common';
import { getWeatherForecasts } from '@/services/index-server';
import { getPaginationParams } from '@/shared';

import { PaginationPanel, WeatherCard } from './components';

export const WeatherData: FC = async () => {
  const { data } = await getWeatherForecasts();
  const { paginationOptions } = getPaginationParams();

  const totalCount = data?.userCitiesWeather?.paginationInfo.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / paginationOptions.limit);
  const paginationPageButtons = Array.from({ length: totalPages }, (_, index) => index + 1);
  const listFooterComponent =
    totalPages > 1 ? <PaginationPanel paginationPageNumbers={paginationPageButtons} /> : null;

  const keyExtractor = (item: { city: string }): string => item.city;

  return (
    <div className="w-full h-full">
      {!data || !data.userCitiesWeather || !data?.userCitiesWeather.edges.length ? (
        <NoData />
      ) : (
        <CustomFlatList
          className="w-full flex flex-wrap gap-6 sm:gap-5 xl:gap-4 2xl:gap-5"
          data={data?.userCitiesWeather.edges}
          renderItem={WeatherCard}
          keyExtractor={keyExtractor}
          listFooterComponent={listFooterComponent}
        />
      )}
    </div>
  );
};
