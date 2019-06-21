module.exports = {
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": ["plugin:@typescript-eslint/recommended", "eslint:recommended"],
  "rules": {
    "@typescript-eslint/no-extra-parens": "error",
    "no-else-return": "error"
  }
  // "env": {
  //     "browser": true,
  //   "es6": true
  //},
  //"globals": {
  //  "Atomics": "readonly",
  //"SharedArrayBuffer": "readonly"
  //},
  //"parserOptions": {
  //   "ecmaVersion": 2018,
  //  "sourceType": "module"
  //},
  //"rules": {
  //   "eqeqeq": ["error", "always"],
  // }
};

// eslint --fix NOME DO ARQUIVO --no-eslintrc --env "es6" --env "node" --parser-options "{ecmaVersion: 2018}" --rule "{NOME DA RULE: error}"
// eslint --fix index.ts --parser "@typescript-eslint/parser" --plugin "@typescript-eslint" --rule "{@typescript-eslint/no-extra-parens: error}"
// eslint index.js --fix --no-eslintrc --env "es6" --env "node" --parser-options "{ecmaVersion: 2018}" --rulesdir "./rules/lib/rules" --rule "{no-console-custom: error}