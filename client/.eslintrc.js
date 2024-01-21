module.exports = {
  extends: ["universe", "universe/native"],
  rules: {
    "import/order": 0,
    "react-native/no-inline-styles": 0,
    "import/namespace": 0,
    "no-duplicate-imports": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": ["error", { vars: "all", args: "after-used", ignoreRestSiblings: false }],
    "@typescript-eslint/explicit-function-return-type": ["error", { allowExpressions: true }],
    "react/prop-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": ["error", { allowArgumentsExplicitlyTypedAsAny: true }],
    "prettier/prettier": "off",
  },
};
