import { View } from 'react-native';
import { useState } from 'react';

import { City, useCityInputComplete, useAddWeatherSubscription, useCitySearchStatus } from '@/hooks';
import { Button, InputAutocomplete } from '@/components/common';
import { ADD_CITY_BTN_TEXT } from '@/components/weatherForecast/constants';
import { useCitySelection } from './hooks';
import { useCitySearchList, useSubscriptionError } from '@/context';

export const WeatherHeaderDown = (): JSX.Element => {
  const [city, setCity] = useState<string>('');
  const { addSubscription } = useAddWeatherSubscription(setCity);
  const { data, loading } = useCityInputComplete(city);
  const { renderCityItem } = useCitySelection(addSubscription);
  const { error } = useSubscriptionError();
  const { listState, onInputFocus, onPressOutside } = useCitySearchList();
  const { isEnabled } = useCitySearchStatus()

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
          isAutocompleteShown={listState.isShown}
          isAutocompleteEnabled={isEnabled}
        />
      </View>
      <View className="w-14">
        <Button text={ADD_CITY_BTN_TEXT} onPress={onPressAddSubscription} />
      </View>
    </View>
  );
};
