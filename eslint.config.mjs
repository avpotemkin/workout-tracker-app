import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactNative from "eslint-plugin-react-native";
import unusedImports from "eslint-plugin-unused-imports";
import prettierConfig from "eslint-config-prettier";

export default [
  js.configs.recommended,
  {
    ignores: [
      "node_modules/**",
      ".expo/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "babel.config.js",
      "metro.config.js",
      "webpack.config.js",
      "**/*.config.js",
    ],
  },
  {
    files: ["**/*.{ts,tsx,js,jsx}"],

    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        __DEV__: "readonly",
        fetch: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        FormData: "readonly",
        document: "readonly",
        window: "readonly",
        navigator: "readonly",
        process: "readonly",
        module: "readonly",
        require: "readonly",
        exports: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        global: "readonly",
        alert: "readonly",
        Promise: "readonly",
      },
    },

    plugins: {
      "@typescript-eslint": tseslint,
      react: react,
      "react-native": reactNative,
      "unused-imports": unusedImports,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      ...tseslint.configs.recommended.rules,
      ...react.configs.recommended.rules,
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "react/jsx-filename-extension": [
        "warn",
        { extensions: [".tsx", ".jsx"] },
      ],
      "react/react-in-jsx-scope": "off",
      "react-native/no-unused-styles": "error",
      "unused-imports/no-unused-imports": "error",
      "no-console": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "react-native/no-inline-styles": "off",
      "react-native/no-color-literals": "off",
      "react-native/split-platform-components": "off",
      "react/prop-types": "off",
      "react/display-name": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },

  {
    files: ["**/*.test.{ts,tsx,js,jsx}", "**/__tests__/**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      globals: {
        test: "readonly",
        expect: "readonly",
        describe: "readonly",
        it: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        jest: "readonly",
      },
    },
  },

  prettierConfig,
];
