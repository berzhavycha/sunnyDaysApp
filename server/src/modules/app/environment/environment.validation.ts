import { IsString, IsNotEmpty, IsInt, IsPositive } from 'class-validator';

export class EnvironmentVariables {
    @IsString({ message: 'POSTGRES_HOST must be a string' })
    @IsNotEmpty({ message: 'POSTGRES_HOST is required' })
    POSTGRES_HOST: string;

    @IsString({ message: 'POSTGRES_USER must be a string' })
    @IsNotEmpty({ message: 'POSTGRES_USER is required' })
    POSTGRES_USER: string;

    @IsString({ message: 'POSTGRES_PASSWORD must be a string' })
    @IsNotEmpty({ message: 'POSTGRES_PASSWORD is required' })
    POSTGRES_PASSWORD: string;

    @IsString({ message: 'POSTGRES_DB must be a string' })
    @IsNotEmpty({ message: 'POSTGRES_DB is required' })
    POSTGRES_DB: string;

    @IsString({ message: 'JWT_ACCESS_SECRET must be a string' })
    @IsNotEmpty({ message: 'JWT_ACCESS_SECRET is required' })
    JWT_ACCESS_SECRET: string;

    @IsString({ message: 'JWT_REFRESH_SECRET must be a string' })
    @IsNotEmpty({ message: 'JWT_REFRESH_SECRET is required' })
    JWT_REFRESH_SECRET: string;

    @IsString({ message: 'REDIS_HOST must be a string' })
    @IsNotEmpty({ message: 'REDIS_HOST is required' })
    REDIS_HOST: string;

    @IsInt({ message: 'REDIS_PORT must be a number' })
    @IsPositive({ message: 'PORT must be a positive integer' })
    REDIS_PORT: number;

    @IsString({ message: 'JWT_ACCESS_TOKEN_TIME must be a string' })
    @IsNotEmpty({ message: 'JWT_ACCESS_TOKEN_TIME is required' })
    JWT_ACCESS_TOKEN_TIME: string;

    @IsString({ message: 'JWT_REFRESH_TOKEN_TIME must be a string' })
    @IsNotEmpty({ message: 'JWT_REFRESH_TOKEN_TIME is required' })
    JWT_REFRESH_TOKEN_TIME: string;

    @IsString({ message: 'LOGIN_FIELD must be a string' })
    @IsNotEmpty({ message: 'LOGIN_FIELD is required' })
    LOGIN_FIELD: string;

    @IsInt({ message: 'PORT must be a number' })
    @IsPositive({ message: 'PORT must be a positive integer' })
    PORT: number;

    @IsString({ message: 'WEATHER_API_KEY must be a string' })
    @IsNotEmpty({ message: 'WEATHER_API_KEY is required' })
    WEATHER_API_KEY: string;

    @IsInt({ message: 'COOKIE_EXPIRY_TIME must be a number' })
    @IsPositive({ message: 'PORT must be a positive integer' })
    COOKIE_EXPIRY_TIME: number;
}
