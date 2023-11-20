/* eslint-env node */
module.exports = {
  root: true,
  "extends": [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier/skip-formatting"
  ],
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    // Force double quotes
    "quotes": ["error", "double"],
    // Force semicolons
    "semi": ["error", "always"],
    // Force snake_case for variables
    "camelcase": ["error", { properties: "never" }],
    // Force CamelCase for functions
    "func-name": ["error", { "pascalCase": true }],
  }
};