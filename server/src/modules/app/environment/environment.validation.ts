import { ValidateProperty } from '../decorators';

export class EnvironmentVariables {
  @ValidateProperty('POSTGRES_HOST', true)
  POSTGRES_HOST: string;

  @ValidateProperty('POSTGRES_USER', true)
  POSTGRES_USER: string;

  @ValidateProperty('POSTGRES_PASSWORD', true)
  POSTGRES_PASSWORD: string;

  @ValidateProperty('POSTGRES_DB', true)
  POSTGRES_DB: string;

  @ValidateProperty('JWT_ACCESS_SECRET', true)
  JWT_ACCESS_SECRET: string;

  @ValidateProperty('JWT_REFRESH_SECRET', true)
  JWT_REFRESH_SECRET: string;

  @ValidateProperty('REDIS_HOST', true)
  REDIS_HOST: string;

  @ValidateProperty('REDIS_PORT', false, true, true)
  PORT: number;

  @ValidateProperty('JWT_ACCESS_TOKEN_TIME', true)
  JWT_ACCESS_TOKEN_TIME: string;

  @ValidateProperty('JWT_REFRESH_TOKEN_TIME', true)
  JWT_REFRESH_TOKEN_TIME: string;

  @ValidateProperty('LOGIN_FIELD', true)
  LOGIN_FIELD: string;

  @ValidateProperty('PASSWORD_MIN_LENGTH', false, true, true)
  PASSWORD_MIN_LENGTH: number;

  @ValidateProperty('WEATHER_API_KEY', true)
  WEATHER_API_KEY: string;

  @ValidateProperty('COOKIE_EXPIRATION_TIME', false, true, true)
  COOKIE_EXPIRATION_TIME: number;

  @ValidateProperty('REDIS_WEATHER_DATA_TTL', false, true, true)
  REDIS_WEATHER_DATA_TTL: number;

  @ValidateProperty('REDIS_DEFAULT_TTL', false, true, true)
  REDIS_DEFAULT_TTL: number;
}
