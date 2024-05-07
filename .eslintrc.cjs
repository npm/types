/* This file is automatically added by @npmcli/template-oss. Do not edit. */

'use strict'

const { readdirSync: readdir } = require('fs')

const localConfigs = readdir(__dirname)
  .filter((file) => file.startsWith('.eslintrc.local.'))
  .map((file) => `./${file}`)

module.exports = {
  root: true,
  ignorePatterns: ['dist/'],
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'max-len': 'off',
  },
  extends: ['@npmcli', ...localConfigs],
}
