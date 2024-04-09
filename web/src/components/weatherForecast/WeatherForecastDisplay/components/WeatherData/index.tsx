import { FC } from "react";

import { NoData, CustomFlatList } from "@/components/common";
import { WeatherForecast } from "@/hooks";
import { WeatherCardInfo, WeatherCard, PaginationPanel } from "./components";
import { TempUnits } from "@/context";
import { getWeatherForecasts } from "@/services/index-server";
import { getPaginationParams } from "@/shared";

export const WeatherData: FC = async () => {
    const { data } = await getWeatherForecasts()
    const paginationOptions = getPaginationParams()

    function renderItem(props: WeatherForecast): JSX.Element {
        return (
            <WeatherCard {...props}>
                <WeatherCardInfo {...props} unit={TempUnits.CELSIUS} />
            </WeatherCard>
        );
    }

    const totalCount = data?.userCitiesWeather?.paginationInfo.totalCount ?? 0
    const totalPages = Math.ceil(totalCount / paginationOptions.limit)
    const listFooterComponent = totalPages > 1 ? <PaginationPanel /> : null

    const keyExtractor = (item: { city: string }): string => item.city;

    return (
        <div>
            {!data || !data.userCitiesWeather || !data?.userCitiesWeather.edges.length ? (
                <NoData />
            ) : (
                <CustomFlatList
                    className="w-full flex flex-wrap gap-6 sm:gap-5 xl:gap-4 2xl:gap-5"
                    data={data?.userCitiesWeather.edges}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    listFooterComponent={listFooterComponent}
                />
            )}
        </div>
    );
};
