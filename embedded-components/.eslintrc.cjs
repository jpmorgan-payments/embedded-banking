module.exports = {
  extends: ['mantine'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
  ignorePatterns: ['*.js', '*.cjs', '*.mjs', '*.d.ts', '*.d.mts', 'vite.config.ts'],
};
