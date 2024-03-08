import { FC } from "react";
import { ForecastItem } from "../ForecastItem";
import { WeatherForecastDays } from "@/hooks";
import { useCurrentCityWeatherInfo } from "@/context";

type Props = {
    info: WeatherForecastDays[]
}

export const Forecast: FC<Props> = ({ info }) => {
    const { setCurrentCityWeatherInfo, onTodayCurrentWeather, isTodayCurrentWeather, setIsTodayCurrentWeather } = useCurrentCityWeatherInfo()

    return (
        <div className="bg-blue-600 rounded-3xl pt-4 py-2 px-3 h-full">
            <div className="flex items-center justify-between mb-4">
                <p className='text-white font-bold text-lg pl-3'>Forecast</p>
                {!isTodayCurrentWeather && <button onClick={onTodayCurrentWeather} className="bg-blue-800 text-white px-4 py-1 rounded-xl mr-2">Get Todays Forecast</button>}
            </div>
            <div className="flex flex-col justify-between">
                {info?.map((dayForecast, index) => {
                    const onForecastItemClick = (): void => {
                        setIsTodayCurrentWeather(false)
                        setCurrentCityWeatherInfo(prev => {
                            if (prev) {
                                return {
                                    info: {
                                        ...prev.info,
                                        ...dayForecast
                                    }
                                }
                            }
                        });
                    };
                    return (
                        <ForecastItem
                            onClick={onForecastItemClick}
                            key={index}
                            {...dayForecast}
                        />
                    )
                })}
            </div>
        </div>
    )
}