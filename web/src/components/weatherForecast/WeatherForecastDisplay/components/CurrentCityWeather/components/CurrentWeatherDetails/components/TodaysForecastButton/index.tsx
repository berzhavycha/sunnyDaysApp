import { FC } from "react";

type Props = {
    onClick: () => void
}

export const TodaysForecastButton: FC<Props> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="bg-blue-800 text-white text-xs px-4 py-1 rounded-xl mr-2 md:text-sm md:px-2 lg:px-4"
        >
            Get Today`s Forecast
        </button>
    )
}