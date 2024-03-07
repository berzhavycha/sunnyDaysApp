import { FC } from "react";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type Props = {
    name: string;
    country: string;
    onClick: (city: string) => Promise<void>
}

export const CityAutocompleteItem: FC<Props> = ({ name, country, onClick }) => {
    return (
        <div
            className="text-black py-3 px-4 flex gap-2 items-center transition-colors duration-300 hover:bg-gray-200 cursor-pointer"
            style={{ borderRadius: '0.5rem' }}
            onClick={() => onClick(name)}
        >
            <FontAwesomeIcon className="text-blue-600" icon={faLocationPin} />
            <div className="flex">
                <div className="main">{name}</div>
                <div className="text-gray-400">, {country}</div>
            </div>
        </div>
    )
}