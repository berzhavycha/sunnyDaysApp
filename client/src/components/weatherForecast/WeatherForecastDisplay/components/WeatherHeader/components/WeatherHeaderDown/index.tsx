import { useState } from 'react';
import { View } from 'react-native';

import { Button, InputAutocomplete } from '@/components/common';
import { ADD_CITY_BTN_TEXT } from '@/components/weatherForecast/constants';
import { City } from './types';
import { useCitySelection, useCityInputComplete, useAddSubscription } from './hooks';
import { SpinnerView } from '../../../SpinnerView';

export const WeatherHeaderDown = (): JSX.Element => {
  const [city, setCity] = useState<string>('');
  const { renderCityItem } = useCitySelection(setCity);
  const { data, loading } = useCityInputComplete(city);
  const { addSubscription, loading: addingLoading, error } = useAddSubscription(city, setCity);

  const onAddSubscription = async (): Promise<void> => await addSubscription();

  return (
    <>
      {
        addingLoading ?
          <SpinnerView />
          :
          <View className="w-full flex-row justify-between">
            <View className="w-60">
              <InputAutocomplete<City>
                loading={loading}
                onRenderItem={renderCityItem}
                placeholder="Search City"
                search={city}
                onSearchChange={setCity}
                data={data}
                error={error}
              />
            </View>
            <View className="w-14">
              <Button
                text={ADD_CITY_BTN_TEXT}
                onPress={onAddSubscription}
              />
            </View>
          </View>
      }
    </>
  );
};
