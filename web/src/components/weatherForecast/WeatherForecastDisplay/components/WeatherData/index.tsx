import { FC } from 'react';

import { CustomFlatList, NoData } from '@/components/common';
import { getWeatherForecasts } from '@/services/index-server';
import { countTotalPages, getPaginationParams } from '@/shared';

import { PaginationPanel, WeatherCard } from './components';

export const WeatherData: FC = async () => {
  const { responseData } = await getWeatherForecasts();
  const { paginationOptions } = getPaginationParams();

  const totalPages = countTotalPages(responseData?.data?.userCitiesWeather, paginationOptions);
  const paginationPageButtons = Array.from({ length: totalPages }, (_, index) => index + 1);

  const listFooterComponent =
    totalPages > 1 ? <PaginationPanel weatherData={responseData?.data} paginationPageNumbers={paginationPageButtons} /> : null;

  const keyExtractor = (item: { city: string }): string => item.city;

  return (
    <div className="w-full h-full">
      {!responseData?.data ||
        !responseData.data?.userCitiesWeather ||
        !responseData.data?.userCitiesWeather.edges.length ? (
        <NoData />
      ) : (
        <CustomFlatList
          className="w-full flex flex-wrap gap-6 sm:gap-5 xl:gap-4 2xl:gap-5"
          data={responseData?.data.userCitiesWeather.edges}
          renderItem={WeatherCard}
          keyExtractor={keyExtractor}
          listFooterComponent={listFooterComponent}
        />
      )}
    </div>
  );
};
