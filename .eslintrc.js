/**
 * @type {import('@types/eslint').ESLint.ConfigData}
 */
module.exports = {
  root: true,

  env: {
    browser: true,
    es6: true,
    node: true,
  },

  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
    sourceType: "module",
    extraFileExtensions: [".json"],
  },

  plugins: ["eslint-plugin-n8n-nodes-base"],

  extends: ["plugin:n8n-nodes-base/community"],

  rules: {},

  ignorePatterns: [
    ".eslintrc.js",
    "**/*.js",
    "**/node_modules/**",
    "**/dist/**",
  ],
};
