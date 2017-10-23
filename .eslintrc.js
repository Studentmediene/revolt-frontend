module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
  ],
  plugins: ['react', 'prettier', 'jsx-a11y', 'jest'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
    'linebreak-style': ['error', 'unix'],
    'no-console': 'warn',
    'jsx-a11y/no-onchange': 'off',
  },
  settings: {
    react: {
      version: '15.4.2',
    },
    'import/resolver': {
      'babel-module': {},
    },
    'import/ignore': ['.css$', '.png$', '.svg$', 'node_modules/*'],
  },
};
