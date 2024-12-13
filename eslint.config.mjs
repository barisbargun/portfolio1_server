import pluginJs from "@eslint/js";
import eslintConfigPrettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins:{
      'simple-import-sort': simpleImportSort,
      import: importPlugin,
    },
  },
  {
    rules:{
      'linebreak-style': ['error', 'unix'],
      'simple-import-sort/imports': 'warn',

      'import/newline-after-import': 'warn',
      'import/no-duplicates': 'warn',
      'import/no-named-as-default-member': 'off',
      'import/no-named-as-default': 'off',

      '@typescript-eslint/no-explicit-any': ['off'],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ]
    }
  },
  eslintConfigPrettier
];
