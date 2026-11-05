// Matches the existing style: single quotes, semicolons.
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...tseslint.configs.recommended,
  {
    rules: {
      quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      semi: ['error', 'always'],
      // The tools parse loose JSON with deliberate `any`s; not worth rewriting.
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
);
