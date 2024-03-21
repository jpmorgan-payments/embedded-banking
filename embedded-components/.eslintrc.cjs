module.exports = {
  extends: ['mantine', 'plugin:tailwindcss/recommended'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['tailwindcss'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'linebreak-style': 'off',
    'arrow-body-style': 'off',
    'tailwindcss/classnames-order': 'error',
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
  ignorePatterns: [
    '*.js',
    '*.cjs',
    '*.mjs',
    '*.d.ts',
    '*.d.mts',
    'vite.config.ts',
  ],
};
