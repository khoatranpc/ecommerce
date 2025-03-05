import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginTs from '@typescript-eslint/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      'react-hooks/exhaustive-deps': "off",
      '@typescript-eslint/consistent-type-imports': 'off',
      'react-hooks/rules-of-hooks': 'off',
      "@typescript-eslint/no-unsafe-function-type": 'off'
    },
    plugins: {
      '@typescript-eslint': eslintPluginTs,
    }
  },
];

export default eslintConfig;