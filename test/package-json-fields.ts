import t from 'tap'
import type { PackageJSON } from '../types/index.d.ts'

t.test('PackageJSON includes modern package metadata fields', (t) => {
  const pkg: PackageJSON = {
    name: 'modern-package-fields',
    version: '1.0.0',
    type: 'module',
    exports: {
      '.': {
        import: './dist/index.mjs',
        require: './dist/index.cjs',
        default: './dist/index.mjs',
      },
      './feature': './dist/feature.mjs',
      './legacy': null,
    },
    imports: {
      '#internal': {
        node: './src/internal-node.js',
        default: './src/internal.js',
      },
    },
    maintainers: [
      {
        name: 'npm maintainer',
        email: 'maintainer@example.com',
      },
    ],
  }

  t.equal(pkg.type, 'module')
  t.match(pkg.exports, { './feature': './dist/feature.mjs' })
  t.match(pkg.imports, { '#internal': { default: './src/internal.js' } })
  t.match(pkg.maintainers, [{ name: 'npm maintainer' }])
  t.end()
})
