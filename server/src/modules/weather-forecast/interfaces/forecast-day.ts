export interface IForecastDay {
  date: string;
  day: {
    avgtemp_c: number;
    avgtemp_f: number;
    condition: {
      text: string;
    };
    avghumidity: number;
  };
}
