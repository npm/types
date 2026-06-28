import t from 'tap'
import type { PackageJSON } from '../types/index.d.ts'

t.test('PackageJSON peerDependenciesMeta allows an empty metadata object', (t) => {
  const pkg: PackageJSON = {
    name: 'peer-meta-empty',
    version: '1.0.0',
    peerDependencies: {
      react: '^18.0.0',
    },
    peerDependenciesMeta: {
      react: {},
    },
  }

  t.same(pkg.peerDependenciesMeta, { react: {} })
  t.end()
})
