import { CodegenConfig } from '@graphql-codegen/cli';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const config: CodegenConfig = {
  overwrite: true,
  config: {
    avoidOptionals: true,
  },
  generates: {
    'src/graphql/__generated__/types.ts': {
      schema: [process.env.BASE_URL as string, './src/graphql/client-schema.graphql'],
      plugins: ['typescript']
    },
    baseUrl: {
      schema: [process.env.BASE_URL as string, './src/graphql/client-schema.graphql'],
      documents: ['src/**/*.base.{ts,tsx}'],
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
