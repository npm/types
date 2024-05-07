export default {
  rootRepo: {
    add: {
      'tsconfig.json': false,
    },
  },
  rootModule: {
    add: {
      'package.json': {
        file: 'package-json.hbs',
        overwrite: false,
      },

    },
  },
  typescript: true,
  allowPaths: [
    '/types/',
  ],
}
