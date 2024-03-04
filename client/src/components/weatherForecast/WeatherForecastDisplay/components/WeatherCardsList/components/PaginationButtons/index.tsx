import React from "react";
import { View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { useWeatherPaginationQueryOptions } from "@/context";
import { START_PAGE_NUMBER } from "@/context/WeatherPaginationOptions/constants";
import { PaginationButton } from "@/components/common";
import { useWeatherPagination } from "@/hooks";
import { PaginationPageButtons } from "../PaginationPageButtons";

export const PaginationButtons = (): JSX.Element => {
    const { currentPage } = useWeatherPaginationQueryOptions();
    const { totalPages, onClickNext, onClickPrev } = useWeatherPagination()

    const isPrevBtnActive = currentPage !== START_PAGE_NUMBER
    const isNextBtnActive = currentPage < totalPages

    const prevBtnContent = <Feather name="arrow-left" color="#fff" />
    const nextBtnContent = <Feather name="arrow-right" color="#fff" />

    return (
        <View className='w-full flex flex-row justify-center pb-4'>
            <PaginationButton
                content={prevBtnContent}
                isActive={isPrevBtnActive}
                onClick={onClickPrev}
                isNavigator
            />
            <PaginationPageButtons />
            <PaginationButton
                content={nextBtnContent}
                isActive={isNextBtnActive}
                onClick={onClickNext}
                isNavigator
            />
        </View>
    );
};
