import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, InputAutocomplete } from '@/components/common';
import { SpinnerView } from '@/components/forecast/SpinnerView';
import { ADD_CITY_BTN_TEXT } from '@/components/forecast/constants';
import { City } from './interfaces';
import { useCitySelection, useCityInputComplete, useAddSubscription } from './hooks';

export const ForecastHeaderDown = (): JSX.Element => {
  const [city, setCity] = useState<string>('');
  const { renderCityItem } = useCitySelection(setCity);
  const { data, loading } = useCityInputComplete(city);
  const { addSubscription, additionLoading, error } = useAddSubscription(city, setCity);

  if (additionLoading) return <SpinnerView />;

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
          error={error}
        />
      </View>
      <View className="w-14">
        <Button
          text={ADD_CITY_BTN_TEXT}
          onPress={async () => {
            await addSubscription();
          }}
        />
      </View>
    </View>
  );
};
