module.exports = {
  bracketSpacing: true,
  printWidth: 120,
  singleQuote: true,
  semi: true,
  trailingComma: 'es5',
  filepath: 'src',
  arrowParens: 'avoid',
  plugins: [
    '@trivago/prettier-plugin-sort-imports'
  ],
  importOrder: [
    '^(react|react-redux|react-router-dom|react-dom|redux|redux-thunk).*$',
    '<THIRD_PARTY_MODULES>',
    '~/app.*',
    '~/processes.*',
    '~/pages.*',
    '~/widgets.*',
    '~/features.*',
    '~/entities.*',
    '~/shared.*',
    '^[.]{2}[\\/]+\\w*\\D+',
    '^[.]{1}[\\/]+\\w\\D+'
  ],
  importOrderSeparation: true,
  importOrderCaseInsensitive: true,
}
