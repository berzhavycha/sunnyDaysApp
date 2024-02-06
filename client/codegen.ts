import { CodegenConfig } from '@graphql-codegen/cli';
import { config as dotenvConfig } from 'dotenv'

dotenvConfig()

const geodbConfigSchema = {
    [process.env.REACT_APP_GEODB_CITIES_URL as string]: {
        headers: {
            'x-rapidapi-key': process.env.REACT_APP_GEODB_CITIES_API_KEY as string,
            'x-rapidapi-host': process.env.REACT_APP_GEODB_CITIES_HOST as string,
            'Content-Type': 'application/json',
        },
    },
}

const config: CodegenConfig = {
    overwrite: true,
    config: {
        avoidOptionals: true,
    },
    generates: {
        'src/graphql/__generated__/types.ts': {
            schema: [
                process.env.REACT_APP_GRAPHQL_BASE_URL as string,
                geodbConfigSchema
            ],
            plugins: ['typescript'],
        },
        baseUrl: {
            schema: [process.env.REACT_APP_GRAPHQL_BASE_URL as string],
            documents: ['src/**/*.base.{ts,tsx}'],
            plugins: ['typescript-operations', 'typed-document-node'],
            preset: 'near-operation-file',
            presetConfig: {
                extension: '.generated.ts',
                baseTypesPath: '~@/graphql/__generated__/types',
            },
        },
        geodbCitiesUrl: {
            schema: [geodbConfigSchema],
            documents: ['src/**/*.geodb.{ts,tsx}'],
            plugins: ['typescript-operations', 'typed-document-node'],
            preset: 'near-operation-file',
            presetConfig: {
                extension: '.generated.ts',
                baseTypesPath: '~@/graphql/__generated__/types',
            },
        },
    },
};

export default config;