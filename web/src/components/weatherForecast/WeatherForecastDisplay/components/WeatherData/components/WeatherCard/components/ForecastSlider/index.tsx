'use client';

import { FC, useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/controller';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { env } from '@/core/env';
import { WeatherForecastDays } from '@/hooks';

import { SubWeatherForecast } from '../SubWeatherForecast';

import './style/index.css';
import { ForecastPreview } from '../ForecastPreview';

type Props = {
  forecasts?: WeatherForecastDays[];
};

export const ForecastSlider: FC<Props> = ({ forecasts }) => {
  const [isSwiperMounted, setIsSwiperMounted] = useState<boolean>(false);

  useEffect(() => {
    // we want to show the preview of forecast info instead of loader before swiper is mounted during SSR
    setIsSwiperMounted(true);
  }, []);

  const isSwiperActive =
    env.NEXT_PUBLIC_MAX_FORECAST_DAYS !== env.NEXT_PUBLIC_FORECAST_DAYS_PER_SLIDE;

  return (
    <>
      {!isSwiperMounted ? (
        <ForecastPreview forecasts={forecasts}/>
      ) : (
        <Swiper
          spaceBetween={16}
          slidesPerView={env.NEXT_PUBLIC_FORECAST_DAYS_PER_SLIDE}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className={`w-full ${isSwiperActive ? 'h-40 -mb-6' : 'h-full'}`}
        >
          {forecasts?.map((props) => (
            <SwiperSlide
              className={`w-1/${env.NEXT_PUBLIC_FORECAST_DAYS_PER_SLIDE} pt-5`}
              key={props.id}
            >
              <SubWeatherForecast className="w-full" {...props} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};