import { View } from 'react-native';
import { FC, useState } from 'react';

import { City, useCityInputComplete, useAddWeatherSubscription } from '@/hooks';
import { Button, InputAutocomplete } from '@/components/common';
import { useCitySearchList, useSubscriptionError, useWeatherCardsList } from '@/context';
import { ADD_CITY_BTN_TEXT } from '@/components/weatherForecast/constants';
import { useCitySelection } from './hooks';

export const WeatherHeaderDown: FC = () => {
  const [city, setCity] = useState<string>('');
  const { addSubscription } = useAddWeatherSubscription(setCity);
  const { data, loading } = useCityInputComplete(city);
  const { renderCityItem } = useCitySelection(addSubscription);
  const { error } = useSubscriptionError();
  const { listState, onInputFocus, onPressOutside } = useCitySearchList();
  const { isDeleting } = useWeatherCardsList()

  const onPressAddSubscription = async (): Promise<void> => await addSubscription(city);

  return (
    <View className="w-full flex-row justify-between">
      <View className="w-60">
        <InputAutocomplete<City>
          loading={loading}
          onRenderItem={renderCityItem}
          placeholder="Search City"
          search={city}
          onSearchChange={setCity}
          data={data}
          error={error.message}
          onInputFocus={onInputFocus}
          onPressOutside={onPressOutside}
          isAutocompleteShown={listState.isVisible}
          isAutocompleteEnabled={listState.isEnabled}
          zIndex={isDeleting ? 0 : 100}
        />
      </View>
      <View className="w-14">
        <Button text={ADD_CITY_BTN_TEXT} onPress={onPressAddSubscription} />
      </View>
    </View>
  );
};
