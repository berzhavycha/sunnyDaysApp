import { clientValidatedEnv } from '../../clientEnvValidation.mjs'
import { serverValidatedEnv } from '../../serverEnvValidation.mjs'

export const env = { ...serverValidatedEnv, ...clientValidatedEnv }