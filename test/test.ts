import { readFile } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import t from 'tap'

import type * as npm from '../src/index.d.ts'

t.test('types', async () => {
  const dir = dirname(fileURLToPath(import.meta.url))
  const f = await readFile(join(dir, '../package.json'), 'utf-8')
  const pkg = JSON.parse(f) as npm.PackageJson
  t.ok(pkg.name)
})
