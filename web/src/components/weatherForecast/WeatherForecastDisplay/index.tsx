import { CurrentCityWeather } from "./components"
import { WeatherCardList } from "./components/WeatherCardList"
import { WeatherHeader } from "./components/WeatherHeader"

export const WeatherForecastDisplay = (): JSX.Element => {
    return (
        <div className='flex gap-10 bg-gray-900 w-full h-screen p-12'>
            <CurrentCityWeather />
            <div className="">
                <WeatherHeader />
                <WeatherCardList />
            </div>
        </div>
    )
}