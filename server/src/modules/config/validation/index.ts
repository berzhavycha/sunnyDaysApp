import * as Joi from 'joi';

import { appValidationSchema } from './app';
import { citySearchValidationSchema } from './city-search';
import { jwtValidationSchema } from './jwt';
import { postgresValidationSchema } from './postgres';
import { redisValidationSchema } from './redis';
import { weatherApiValidationSchema } from './weather-api';

export const configValidationSchema = Joi.object()
  .concat(appValidationSchema)
  .concat(postgresValidationSchema)
  .concat(jwtValidationSchema)
  .concat(redisValidationSchema)
  .concat(weatherApiValidationSchema)
  .concat(citySearchValidationSchema);
