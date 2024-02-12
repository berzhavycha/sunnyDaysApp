import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';

import { HttpStatusCode } from '@modules/weather-forecast';
import { CityPrefixArgsDto } from './dtos';
import { GeodbResponse } from './interfaces';


@Injectable()
export class GeodbRepository {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) { }

    async getCitiesByPrefix(cityPrefixArgs: CityPrefixArgsDto): Promise<AxiosResponse<GeodbResponse>> {
        const { prefix, sort, offset } = cityPrefixArgs

        const geodbApiBaseUrl = this.configService.get<string>('GEODB_API_BASE_URL');
        const geodbMaxCitiesLimit = this.configService.get<string>('GEODB_MAX_CITIES_LIMIT');

        const apiUrl = `${geodbApiBaseUrl}?namePrefix=${prefix}&sort=${sort}&offset=${offset}&limit=${geodbMaxCitiesLimit}`;

        return this.httpService
            .get(apiUrl, {
                headers: {
                    'X-RapidAPI-Key': this.configService.get<string>('GEODB_API_KEY'),
                    'X-RapidAPI-Host': this.configService.get<string>('GEODB_API_HOST')
                },
                validateStatus: function (status) {
                    return (
                        status >= HttpStatusCode.SUCCESS &&
                        status < HttpStatusCode.REDIRECTION
                    );
                },
            })
            .toPromise();
    }
}
