export interface IForecastDay {
    day: {
        avgtemp_c: number,
        avgtemp_f: number,
        condition: {
            text: string
        }
        avghumidity: number
    }
}