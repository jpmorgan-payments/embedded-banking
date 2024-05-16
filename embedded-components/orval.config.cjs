module.exports = {
  'embedded-banking': {
    input: './api-specs/embedded-banking-solutions-api-v2-external.yml',
    output: {
      mode: 'split',
      mock: true,
      target: './src/api/generated/embedded-banking.ts',
      client: 'react-query',
      headers: true,
      override: {
        mutator: {
          path: './src/api/axios-instance.ts',
          name: 'ebInstance',
        },
      },
    },
  },
};
