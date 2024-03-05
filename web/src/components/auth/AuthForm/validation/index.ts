import * as Joi from 'joi';

import { AuthType } from '@/hooks';
import { PASSWORD_MIN_LENGTH } from '@/global';

export const userSchema = (actionType: AuthType): Joi.Schema => {
  let schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'string.email': 'Invalid email format',
        'string.empty': 'Email is required',
      }),
    password: Joi.string()
      .min(PASSWORD_MIN_LENGTH)
      .required()
      .messages({
        'string.min': `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
        'string.empty': 'Password is required',
      }),
  });

  if (actionType === AuthType.SIGN_UP) {
    schema = schema.keys({
      confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match',
        'string.empty': 'Confirm password is required',
      }),
    });
  }

  return schema;
};
