import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';

export default [
  {
    ignores: ['dist', 'build', 'node_modules'],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    ...pluginReact.configs.flat.recommended,
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      // Rule to fix the 'Unexpected empty object pattern' error
      'no-empty-pattern': 'off',
    },
  },
];