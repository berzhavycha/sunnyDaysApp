'use client'

import React from 'react';

import { useWeatherPaginationQueryOptions } from '@/context';
import { useWeatherData, useWeatherPagination } from '@/hooks';
import { useRenderWeatherCard } from './hooks';
import { CustomFlatList, Spinner } from '@/components/common';



export const WeatherCardList = (): JSX.Element => {
    const { data, loading } = useWeatherData();
    const { renderItem } = useRenderWeatherCard();
    const { onGoToPage, onClickNext, onClickPrev } = useWeatherPagination();
    const { totalPages, paginationPageNumbers, currentPage } = useWeatherPaginationQueryOptions();

    // const listFooterComponent =
    //     totalPages > 1 ? (
    //         <PaginationButtons
    //             startPageNumber={START_PAGE_NUMBER}
    //             currentPage={currentPage}
    //             paginationPageNumbers={paginationPageNumbers}
    //             totalPages={totalPages}
    //             onClickPageButton={onGoToPage}
    //             onClickNext={onClickNext}
    //             onClickPrev={onClickPrev}
    //         />   
    //     ) : null;

    return (
        <div className='w-full h-full'>
            {loading ? (
                <div className="w-full h-full">
                    <Spinner />
                </div>
            ) :
                !data?.userCitiesWeather.edges.length ?
                    <h1 className='text-white'>No data</h1>
                    :
                    (
                        <CustomFlatList
                            className='w-full flex flex-wrap gap-6'
                            data={data?.userCitiesWeather.edges ?? []}
                            renderItem={renderItem}
                        />
                    )
            }
        </div>
    );
};