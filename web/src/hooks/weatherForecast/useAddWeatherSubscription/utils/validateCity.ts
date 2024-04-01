import { UserCitiesWeatherQuery } from '../../useWeatherData';
import { validateCityRules } from '../constants';

export const validateCity = (city: string, data: UserCitiesWeatherQuery | null): string | void => {
  const failedRule = validateCityRules.find((rule) => !rule.validator(city, data));
  if (failedRule) {
    return failedRule.message;
  }
};
