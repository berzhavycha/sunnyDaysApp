import { UserCitiesWeatherQuery } from "../../useWeatherData/queries";
import { validateCityRules } from "../constants";

export const validateCity = (city: string, data: UserCitiesWeatherQuery | undefined): string | void => {
    const failedRule = validateCityRules.find((rule) => !rule.validator(city, data));
    if (failedRule) {
        return typeof failedRule.message === 'function' ? failedRule.message(city) : failedRule.message;
    }
};
