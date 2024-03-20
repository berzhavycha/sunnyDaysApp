import { serverSchema } from './envSchemas.mjs';
import { serverEnv } from './env.mjs';
import { formatErrors } from './clientEnvValidation.mjs';

const { error: validationError, value: validatedEnv } = serverSchema.validate(serverEnv, {
    abortEarly: false,
    allowUnknown: true,
});

if (typeof window === "undefined") {
    for (const key of Object.keys(validatedEnv)) {
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

export const serverValidatedEnv = validatedEnv;
