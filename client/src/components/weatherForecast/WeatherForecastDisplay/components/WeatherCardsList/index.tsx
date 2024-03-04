  import { FlatList } from 'react-native';

  import { NoData } from '@/components/common';
  import { useWeatherData, useWeatherPagination } from '@/hooks';
  import { SpinnerView } from '../SpinnerView';
  import { useRenderWeatherCard } from './hooks';
  import { PaginationButtons } from './components';

  export const WeatherCardsList = (): JSX.Element => {
    const { data, loading } = useWeatherData();
    const { renderItem } = useRenderWeatherCard();
    const { totalPages } = useWeatherPagination()

    const keyExtractor = (item: { city: string }): string => item.city;
    const listFooterComponent = totalPages !== 1 ? <PaginationButtons /> : null

    return (
      <>
        {loading ? (
          <SpinnerView />
        ) : !data?.userCitiesWeather.edges?.length ? (
          <NoData message="No weather information available" />
        ) : (
          <FlatList
            className="w-full"
            data={data.userCitiesWeather.edges}
            keyExtractor={keyExtractor}
            ListFooterComponent={listFooterComponent}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        )}
      </>
    );
  };
