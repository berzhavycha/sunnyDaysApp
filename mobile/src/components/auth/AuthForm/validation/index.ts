import * as Joi from 'joi';

import { Env } from '@/env';
import { AuthType } from '@/hooks';

export const userSchema = (actionType: AuthType): Joi.Schema => {
  let schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'string.email': 'Invalid email format',
        'any.required': 'Email is required',
      }),
    password: Joi.string()
      .min(+Env.PASSWORD_MIN_LENGTH)
      .required()
      .messages({
        'string.min': `Password must be at least ${Env.PASSWORD_MIN_LENGTH} characters long`,
        'any.required': 'Password is required',
      }),
  });

  if (actionType === AuthType.SIGN_UP) {
    schema = schema.keys({
      confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match',
        'any.required': 'Confirm password is required',
      }),
    });
  }

  return schema;
};
