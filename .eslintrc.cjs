module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react-refresh', '@typescript-eslint', 'react', 'prettier', 'react-hooks'],
  rules: {
    'global-require': 0,
    '@typescript-eslint/no-var-requires': 0,
    'react/function-component-definition': 0,
    'react-refresh/only-export-components': 1,
    'react/react-in-jsx-scope': 0,
    '@typescript-eslint/no-explicit-any': 2,
    'import/prefer-default-export': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'import/no-extraneous-dependencies': [
      2,
      {
        devDependencies: true,
      },
    ],
    '@typescript-eslint/no-misused-promises': [
      2,
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
    'react/jsx-props-no-spreading': 0,
    'prettier/prettier': 2,
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
};
