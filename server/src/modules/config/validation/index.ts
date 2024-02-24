import * as Joi from 'joi';

import { appValidationSchema } from './app';
import { jwtValidationSchema } from './jwt';
import { postgresValidationSchema } from './postgres';
import { redisValidationSchema } from './redis';
import { weatherApiValidationSchema } from './weather-api';
import { citySearchValidationSchema } from './city-search';

export const configValidationSchema = Joi.object()
  .concat(appValidationSchema)
  .concat(postgresValidationSchema)
  .concat(jwtValidationSchema)
  .concat(redisValidationSchema)
  .concat(weatherApiValidationSchema)
  .concat(citySearchValidationSchema);
