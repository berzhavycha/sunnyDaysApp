import { View } from 'react-native';

import { Button, InputAutocomplete } from '@/components/common';
import { ADD_CITY_BTN_TEXT } from '@/components/weatherForecast/constants';
import { City } from './types';
import { useCitySelection, useCityInputComplete, useAddSubscription } from './hooks';

export const WeatherHeaderDown = (): JSX.Element => {
  const { setCity, city, addSubscription, error } = useAddSubscription();
  const { renderCityItem } = useCitySelection(setCity);
  const { data, loading } = useCityInputComplete(city);

  return (
    <>
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
          <Button text={ADD_CITY_BTN_TEXT} onPress={addSubscription} />
        </View>
      </View>
    </>
  );
};
