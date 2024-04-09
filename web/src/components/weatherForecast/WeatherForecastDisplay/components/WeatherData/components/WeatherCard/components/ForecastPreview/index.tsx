import { WeatherForecastDays } from "@/shared";
import { SubWeatherForecast } from "../SubWeatherForecast";
import { env } from "@/core/env";
import { FC } from "react";

type Props = {
    forecasts?: WeatherForecastDays[];
}

export const ForecastPreview: FC<Props> = ({ forecasts }) => {
    return (
        <div className="w-full flex flex-row gap-4 pt-5">
            {forecasts
                ?.slice(0, env.NEXT_PUBLIC_FORECAST_DAYS_PER_SLIDE)
                ?.map((props) => (
                    <SubWeatherForecast
                        key={props.id}
                        {...props}
                        className={`w-1/${env.NEXT_PUBLIC_FORECAST_DAYS_PER_SLIDE}`}
                    />
                ))}
        </div>
    )
}