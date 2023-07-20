/* eslint-env node */

module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": "warn",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".vue", ".ts", ".d.ts"],
      },
      alias: {
        extensions: [".vue", ".js", ".ts", ".scss", ".d.ts"],
        map: [
          ["@/components", "./src/components"],
          ["@/pages", "./src/pages"],
          ["@/router", "./src/router"],
          ["@/store", "./src/store"],
          ["@/styles", "./src/styles"],
          ["@/types", "./src/types"],
          ["@/utils", "./src/utils"],
        ],
      },
    },
  },
};
