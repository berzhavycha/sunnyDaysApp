export interface IForecastDay {
  date: string;
  day: {
    avgtemp_c: number;
    avgtemp_f: number;
    totalprecip_mm: number;
    maxwind_kph: number;
    condition: {
      text: string;
    };
    avghumidity: number;
  };
}
