module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-native', '@typescript-eslint', 'unused-imports'],
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    'react-native/react-native': true,
    es6: true,
    node: true,
  },
  rules: {
    // Allow use before define (e.g., styles)
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',

    // Allow JSX in .tsx files
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],

    // Turn off React 17 import rule
    'react/react-in-jsx-scope': 'off',

    // Enforce no unused styles
    'react-native/no-unused-styles': 'error',

    // Unused imports
    'unused-imports/no-unused-imports': 'error',

    // Optional: silence console warnings
    'no-console': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};