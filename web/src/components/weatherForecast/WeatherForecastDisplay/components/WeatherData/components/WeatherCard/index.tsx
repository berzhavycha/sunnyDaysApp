import { WeatherForecast } from "@/shared";
import { WeatherCardInfo, InteractiveWeatherCard } from "./components";

export const WeatherCard = (props: WeatherForecast): JSX.Element => {
  return (
    <InteractiveWeatherCard {...props}>
      <WeatherCardInfo {...props} />
    </InteractiveWeatherCard>
  );
}
