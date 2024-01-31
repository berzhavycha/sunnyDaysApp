import { plainToClass } from "class-transformer";
import { validateSync, ValidationError } from "class-validator";
import { EnvironmentVariables } from "./environment.validation";

export const validate = (config: Record<string, unknown>) => {
    const validatedConfig = plainToClass(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });

    const errors: ValidationError[] = validateSync(validatedConfig, {
        skipMissingProperties: false,
    });

    if (errors.length > 0) {
        const errorMessage = errors.map(error => {
            const constraints = Object.values(error.constraints || {});
            return constraints.length > 0 ? constraints.join(', ') : `Validation constraints missing`;
        }).join('; ');

        throw new Error(`Validation failed: \n ${errorMessage}\n`);
    }

    return validatedConfig;
};
