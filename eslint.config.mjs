import { defineConfig } from 'eslint/config';

export default defineConfig([
  { ignores: ['assets/**', 'dist/**', '.astro/**'] },
  {
    files: ['**/*.{js,mjs}'],
    rules: {
      'no-undef': ['error', { typeof: true }],
      'no-unused-vars': 'error',
      'no-unreachable': 'error',
    },
    languageOptions: {
      globals: { URL: 'readonly', Response: 'readonly', console: 'readonly' },
    },
  },
]);
