module.exports = {
  env: {
    commonjs: true,
    node: true,
    browser: true,
    es6: true,
    jest: true,
  },
  extends: ["eslint:recommended"],
  globals: {},
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  ignorePatterns: ["node_modules/"],
  rules: {},
  settings: {},
};
