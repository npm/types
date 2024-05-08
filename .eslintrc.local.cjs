module.exports = {
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  overrides: [{
    files: ['test/fixtures/*.ts'],
    rules: {
      'max-len': 0,
    },
  }],
}
