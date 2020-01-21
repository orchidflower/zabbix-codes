module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript'
  ],
  rules: {
    'no-console': 0,
    'no-debugger': 0,
    "indent": ["warn", 4],
    "no-extra-semi": 'off',
    "semi": ["warn", "always"],
    "space-before-function-paren": ["warn", "never"],
    "no-tabs":"off"
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
