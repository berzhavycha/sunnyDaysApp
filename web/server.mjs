import { serverSchema } from './envValidation.mjs';
import { serverEnv } from './env.mjs';
import { env as clientEnv, formatErrors } from './client.mjs';

const { error: validationError, value: validatedServerEnv } = serverSchema.validate(serverEnv, {
    abortEarly: false,
    allowUnknown: true,
});

if (typeof window === "undefined") {
    for (const key of Object.keys(validatedServerEnv)) {
        if (key.startsWith('NEXT_PUBLIC_')) {
            console.warn('❌ You are exposing a server-side env:\n', key);
            throw new Error('You are exposing a server-side env');
        }
    }

    if (validationError) {
        console.error('❌ Invalid environment variables:\n', ...formatErrors(validationError.details));
        throw new Error('Invalid environment variables');
    }
}

export const env = { ...validatedServerEnv, ...clientEnv };
