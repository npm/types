import { spawn } from 'node:child_process'
import { resolve } from 'node:path'
import t from 'tap'

const REGISTRY = 'https://registry.npmjs.org'

type FixtureEntry = {
  name: string;
  version?: string;
  manifestFormat?: boolean;
};

const FIXTURES: FixtureEntry[] = [
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
  const fixtures = await getFixtures()

  const dir = t.testdir({
    'tsconfig-test.json': JSON.stringify({
      compilerOptions: {
        module: 'NodeNext',
        moduleResolution: 'nodenext',
        strict: true,
        target: 'es2022',
        noEmit: true,
        rootDir: 'fixtures',
      },
      include: ['fixtures'],
    }, null, 2),
    fixtures: Object.fromEntries(Object.entries(fixtures).map(([k, v]) => [
      k,
      `import type * as npmTypes from '../../../../types/index.d.ts'\n${v}`,
    ])),
  })

  t.test('snapshots', async t => {
    for (const [k, v] of Object.entries(fixtures)) {
      t.matchSnapshot(v, k)
    }
  })

  t.test('tsc', async t => new Promise<void>(res => {
    const proc = spawn(
      resolve(root, './node_modules/.bin/tsc'),
      ['--noEmit', '-p', './tsconfig-test.json'],
      { cwd: dir }
    )
    let output = ''
    proc.stdout.on('data', (d) => output += d.toString())
    proc.on('close', (code) => {
      if (code === 0) {
        t.ok(true, 'tsc works')
      } else {
        t.fail(`tsc failed with code ${code} and message:\n${output}`)
      }
      res()
    })
  }))
})

async function getFixtures () {
  const fixtures: Record<string, string> = {}

  for (const { name, version } of FIXTURES) {
    const fixtureName = version ? `${name}@${version}` : name

    for (const manifestFormat of [false, true]) {
      // Manifest format is only available for Packument documents, not
      // PackumentVersions
      if (manifestFormat && version) {
        continue
      }

      const fixturePath = manifestFormat ? `${fixtureName}.manifest.ts` : `${fixtureName}.ts`
      const tsType = manifestFormat
        ? (version ? 'ManifestVersion' : 'Manifest')
        : version ? 'PackumentVersion' : 'Packument'

      const pkg = await registryFetch({
        name,
        version,
        manifestFormat,
      })

      fixtures[fixturePath] =
        `export const metadata: npmTypes.${tsType} = ${JSON.stringify(pkg, null, 2)}`
    }
  }

  return fixtures
}

// Note: We could use `pacote` or `npm-registry-fetch` here, but this package is
// intended to document the types returned by registry requests.  Fetching URLs
// directly here insures there's no manipulation of the data between the
// registry and the fixture.
async function registryFetch ({ name, version, manifestFormat }: FixtureEntry) {
  const url = new URL(version ? `/${name}/${version}` : `/${name}`, REGISTRY)

  const headers: Record<string, string> = {}
  if (manifestFormat) {
    headers.Accept = 'application/vnd.npm.install-v1+json'
  }

  const res = await fetch(url, { headers })

  if (!res.ok) {
    throw new Error(`Fetch failed: ${url} (status: ${res.status})`)
  }

  return await res.json()
}
