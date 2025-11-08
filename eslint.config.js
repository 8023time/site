import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', 'build']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // JavaScript 规则
      'no-console': ['warn', { allow: ['error'] }], // 警告 console.log，但允许 console.error
      eqeqeq: 'error', // 强制使用 === 而非 ==

      // TypeScript 规则
      '@typescript-eslint/no-explicit-any': 'error', // 禁止使用 any 类型
    },
  },
  {
    ignores: ['dist', 'build', 'node_modules', 'public'],
  },
]);
