import { CurrentCityWeather, WeatherCardList, WeatherHeader } from "./components"

export const WeatherForecastDisplay = (): JSX.Element => {
    return (
        <div className='flex gap-10 bg-gray-900 h-screen p-12'>
            <CurrentCityWeather />
            <div className="w-3/4">
                <WeatherHeader />
                <WeatherCardList />
            </div>
        </div>
    )
}