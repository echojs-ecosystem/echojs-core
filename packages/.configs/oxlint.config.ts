import { defineConfig } from 'oxlint'

export default defineConfig({
  categories: {
    correctness: 'warn',
    suspicious: 'warn',
    perf: 'warn',
  },
  rules: {
    'eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'eslint/no-debugger': 'error',
    'eslint/no-console': 'warn',

    'typescript/no-explicit-any': 'warn',
    'typescript/no-non-null-assertion': 'warn',
    // Hooks intentionally run sequentially - this is by design
    'eslint/no-await-in-loop': 'off',
    // Test functions often defined inline intentionally
    'eslint-plugin-unicorn/consistent-function-scoping': 'off',
    // Empty classes sometimes used in tests
    'typescript/no-extraneous-class': 'off',
  },
  ignorePatterns: [
    '**/__tests__/**',
    '**/*.test.ts',
    '**/*.spec.ts',
    '**/dist/**',
    '**/build/**',
    '**/node_modules/**',
    '**/.turbo/**',
    '**/doc_build/**',
  ],
})
