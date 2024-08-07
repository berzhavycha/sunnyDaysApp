import { clientSchema } from './envSchemas.mjs';
import { clientEnv } from './env.mjs';

const { error: validationError, value: validatedEnv } = clientSchema.validate(clientEnv, {
    abortEarly: false,
    allowUnknown: true,
});

export const formatErrors = (errors) => {
    return errors.map((err) => `NULL: ${err.message}`).join('\n');
};

if (validationError) {
    console.error('❌ Invalid environment variables:\n', formatErrors(validationError.details));
    throw new Error('Invalid environment variables');
}

for (const key of Object.keys(validatedEnv)) {
    if (!key.startsWith('NEXT_PUBLIC_')) {
        console.warn('❌ Invalid public environment variable name:\n', key);
        throw new Error('Invalid public environment variable name');
    }
}

export const clientValidatedEnv = validatedEnv;
