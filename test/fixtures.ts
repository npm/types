import { spawn } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import { resolve, join } from 'node:path'
import t from 'tap'

const REGISTRY = 'https://registry.npmjs.org'

const FIXTURES = [
  { name: 'not-licensed', version: '1.0.0' },
  { name: 'not-licensed' },
  { name: 'tiny-tarball', version: '1.0.0' },
  { name: 'tiny-tarball' },
  // Legacy packages that have informed type declarations
  { name: 'uuid', version: '0.0.2' },
  { name: 'uuid', version: '1.4.1' },
]

/**
 * Unit test for types.  Does the following...
 * 1. For each FIXTURES url, fetches the registry data
 * 2. ... generates a TS fixture file that assigns the data to a variable with
 *    the appropriate type
 * 3. Runs `tsc` to validate registry data matches the type definition.
 */
t.test('fixtures', async (t) => {
  const root = process.cwd()
  const tsConfig = await readFile(join(root, 'tsconfig.json'), 'utf-8')
  const fixtures = await getFixtures()

  const dir = t.testdir({
    'tsconfig-test.json': JSON.stringify({
      compilerOptions: {
        ...JSON.parse(tsConfig).compilerOptions,
        rootDir: 'fixtures',
      },
      include: ['fixtures'],
    }),
    fixtures: Object.fromEntries(
      Object.entries(fixtures).map(([k, v]) => [
        k,
        `import type * as npmTypes from '../../../../types/index.d.ts'\n` +
        `export const metadata: npmTypes.${v}`,
      ])
    ),
  })

  t.test('snapshots', async (t) => {
    for (const [k, v] of Object.entries(fixtures)) {
      t.matchSnapshot(v, k)
    }
  })

  t.test('tsc', (t) =>
    new Promise<void>((res) => {
      const proc = spawn(
        resolve(root, './node_modules/.bin/tsc'),
        ['--noEmit', '-p', './tsconfig-test.json'],
        { cwd: dir }
      )
      let output = ''
      proc.stdout.on('data', (d) => (output += d.toString()))
      proc.on('close', (code) => {
        t.equal(code, 0, output)
        res()
      })
    })
  )
})

async function getFixtures () {
  const fixtures: Record<string, string> = {}

  for (const { name, version } of FIXTURES) {
    const fixtureName = `${name}${version ? `@${version}` : ''}`

    for (const corgi of [false, true]) {
      // Corgis are only available for Packument documents, not PackumentVersions
      if (corgi && version) {
        continue
      }

      const pkg = await registryFetch(name, version, corgi)

      const fixturePath = `${fixtureName}${corgi ? '.manifest' : ''}.ts`
      const tsType = `${corgi ? 'Manifest' : 'Packument'}${version ? 'Version' : ''}`
      fixtures[fixturePath] = `${tsType} = ${JSON.stringify(pkg, null, 2)}`
    }
  }

  return fixtures
}

// Note: We could use `pacote` or `npm-registry-fetch` here, but this package is
// intended to document the types returned by registry requests.  Fetching URLs
// directly here insures there's no manipulation of the data between the
// registry and the fixture.
async function registryFetch (name: string, version?: string, corgi?: boolean) {
  const res = await fetch(`${REGISTRY}/${name}${version ? `/${version}` : ''}`, {
    headers: corgi ? { Accept: 'application/vnd.npm.install-v1+json' } : {},
  })

  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.url} (status: ${res.status})`)
  }

  return res.json()
}
