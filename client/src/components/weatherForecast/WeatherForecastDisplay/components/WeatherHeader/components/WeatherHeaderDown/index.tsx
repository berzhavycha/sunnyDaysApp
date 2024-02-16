import { View } from 'react-native';

import { City, useCityInputComplete, useAddWeatherSubscription } from '@/hooks';
import { Button, InputAutocomplete } from '@/components/common';
import { ADD_CITY_BTN_TEXT } from '@/components/weatherForecast/constants';
import { useCitySelection } from './hooks';

export const WeatherHeaderDown = (): JSX.Element => {
  const { city, setCity, addSubscription, error } = useAddWeatherSubscription();
  const { data, loading } = useCityInputComplete(city);

  const addSubscriptionOnCityPress = async (selectedCity: string): Promise<void> => {
    setCity(selectedCity);
    await addSubscription();
  }

  const { renderCityItem } = useCitySelection(addSubscriptionOnCityPress);

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
