module.exports = {
  extends: ['mantine'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'linebreak-style': 'off',
    'arrow-body-style': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        '': 'never',
      },
    ],
  },
  ignorePatterns: ['*.js', '*.cjs', '*.mjs', '*.d.ts', '*.d.mts', 'vite.config.ts'],
};
