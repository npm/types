import { spawn } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import t from 'tap'

const REGISTRY = 'https://registry.npmjs.org'

t.test('search endpoint response matches SearchResponse', async (t) => {
  const root = process.cwd()
  const tsConfig = await readFile(join(root, 'tsconfig.json'), 'utf-8')
  const searchResponse = await registrySearch('react')

  const dir = t.testdir({
    'tsconfig-test.json': JSON.stringify({
      compilerOptions: {
        ...JSON.parse(tsConfig).compilerOptions,
        rootDir: 'fixtures',
      },
      include: ['fixtures'],
    }),
    fixtures: {
      'search.ts':
        `import type * as npmTypes from '../../../../types/index.d.ts'\n` +
        `export const metadata: npmTypes.SearchResponse = ${JSON.stringify(
          searchResponse,
          (_k: string, v: unknown) =>
            (!Array.isArray(v) && v && typeof v === 'object') ?
              Object.fromEntries(
                Object.entries(v).sort(([a], [b]) => a.localeCompare(b))
              ) : v,
          2
        )}`,
    },
  })

  await new Promise<void>((resolvePromise) => {
    const proc = spawn(
      resolve(root, './node_modules/.bin/tsc'),
      ['--noEmit', '-p', './tsconfig-test.json'],
      { cwd: dir }
    )
    let output = ''
    proc.stdout.on('data', (d) => (output += d.toString()))
    proc.stderr.on('data', (d) => (output += d.toString()))
    proc.on('close', (code) => {
      t.equal(code, 0, output)
      resolvePromise()
    })
  })
})

async function registrySearch (text: string) {
  const res = await fetch(`${REGISTRY}/-/v1/search?text=${text}&size=1`)

  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.url} (status: ${res.status})`)
  }

  return res.json()
}
