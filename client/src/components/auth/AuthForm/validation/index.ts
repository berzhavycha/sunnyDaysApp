import * as Joi from 'joi';

import { AuthType } from '@/hooks';
import { REACT_APP_PASSWORD_MIN_LENGTH } from '@env';

export const userSchema = (actionType: string): Joi.Schema => {
  let schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'string.email': 'Invalid email format',
        'any.required': 'Email is required',
      }),
    password: Joi.string()
      .min(+REACT_APP_PASSWORD_MIN_LENGTH)
      .required()
      .messages({
        'string.min': `Password must be at least ${REACT_APP_PASSWORD_MIN_LENGTH} characters long`,
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
