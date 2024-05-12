import { getCitySearchStatus } from "@/services";
import { useEffect, useState } from "react";

type CitySearchListState = {
    isVisible: boolean;
    isEnabled: boolean;
};

type HookReturn = {
    listState: CitySearchListState;
    onPressOutside: () => void;
    onInputFocus: () => void;
}

export const useCitySearchList = (): HookReturn => {
    const [listState, setListState] = useState<CitySearchListState>({
        isVisible: false,
        isEnabled: false
    });

    const onPressOutside = (): void => {
        setListState((prevState) => ({
            ...prevState,
            isVisible: false,
        }));
    };

    const onInputFocus = (): void => {
        setListState((prevState) => ({
            ...prevState,
            isVisible: true,
        }));
    };

    useEffect(() => {
        const fetchCitySearchStatus = async (): Promise<void> => {
            const data = await getCitySearchStatus()

            setListState(prev => ({
                ...prev,
                isEnabled: data
            }));
        };

        fetchCitySearchStatus();
    }, [])

    return {
        listState,
        onPressOutside,
        onInputFocus
    }
}