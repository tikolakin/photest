module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
    es2021: true,
    'cypress/globals': true,
  },
  plugins: ['@typescript-eslint', 'cypress', 'prettier', 'node'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:cypress/recommended',
    'plugin:prettier/recommended',
    'plugin:node/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors.
  ],
  settings: {
    'import/resolver': {
      typescript: {
        project: 'cypress/tsconfig.json',
      },
    },
  },
  rules: {
    'prettier/prettier': 'error',
    'node/no-unpublished-import': [
      'error',
      {
        allowModules: ['cypress'],
      },
    ],
    'node/no-unsupported-features/es-syntax': [
      'error',
      {
        ignores: ['modules'],
        version: `>=18.16.0`,
      },
    ],
    'node/no-missing-import': 'off',
    'node/no-unpublished-import': 'off',
  },
}
