import * as assert from 'node:assert'
import { exec as _exec, ExecException } from 'node:child_process'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { test } from 'node:test'
import { promisify } from 'node:util'

const exec = promisify(_exec)

const REGISTRY = 'https://registry.npmjs.org'

type TestEntry = {
  name: string;
  version?: string;
  manifestFormat?: boolean;
};

const TESTS: TestEntry[] = [
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
 * 1. For each TESTS url, fetches the registry data
 * 2. ... generates a TS fixture file that assigns the data to a variable with the appropriate type
 * 3. Runs `tsc` to validate registry data matches the type definition.
 */
async function main () {
  const { stdout } = await exec('git rev-parse --show-toplevel')
  const rootDir = stdout.trim()

  process.chdir(join(rootDir, 'test'))

  await generateFixtures()
  console.log('All fixtures generated')

  test('fixtures compile', async () => {
    // Validate all fixtures
    try {
      await exec('tsc --noEmit -p ./tsconfig-test.json')
      console.log('All fixtures compiled successfully')
    } catch (err) {
      if (isExecException(err)) {
        assert.fail(err.stdout)
      } else {
        throw err
      }
    }
  })
}

async function generateFixtures () {
  const template = await readFile('fixture-template.ts', 'utf-8')

  await mkdir('fixtures', { recursive: true })

  for (const testEntry of TESTS) {
    const { name, version } = testEntry
    const fixtureName = version ? `${name}@${version}` : name

    for (const manifestFormat of [false, true]) {
      // Manifest format is only available for Packument documents, not
      // PackumentVersions
      if (manifestFormat && version) {
        continue
      }

      testEntry.manifestFormat = manifestFormat

      let tsType = version ? 'PackumentVersion' : 'Packument'
      let fixturePath = `fixtures/${fixtureName}.ts`

      if (manifestFormat) {
        tsType = version ? 'ManifestVersion' : 'Manifest'
        fixturePath = `fixtures/${fixtureName}.manifest.ts`
      }

      console.log(`Generating ${fixturePath}`)
      const pkg = await registryFetch(testEntry)
      const content = template
        .replaceAll(/^\s*\/\/.*/gm, '')
        .replace('TYPE', tsType)
        .replace('DATA', JSON.stringify(pkg, null, 2))

      await writeFile(fixturePath, content)
    }
  }
}

// Note: We could use `pacote` or `npm-registry-fetch` here, but this package is
// intended to document the types returned by registry requests.  Fetching URLs
// directly here insures there's no manipulation of the data between the
// registry and the fixture.
async function registryFetch ({ name, version, manifestFormat }: TestEntry) {
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

function isExecException (err: unknown): err is ExecException {
  return Boolean(err) && 'cmd' in (err as ExecException)
}

await main()
