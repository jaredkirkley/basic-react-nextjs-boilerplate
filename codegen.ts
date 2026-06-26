import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './src/lib/graphql/schema.graphql',
  documents: ['src/**/*.{tsx,ts}', '!src/**/*.test.{tsx,ts}', '!src/lib/graphql/__generated__/**'],
  generates: {
    'src/lib/graphql/__generated__/': {
      preset: 'client',
      presetConfig: {
        // Keeps using the familiar `gql` tag name instead of `graphql`
        gqlTagName: 'gql',
      },
    },
  },
};

export default config;
