import * as fs from "node:fs/promises";
import * as pacote from "pacote";
import * as prettier from "prettier";

// Check the types against some actual examples from the npm registry.
// Call pacote.manifest() and pacote.packument() with and without the fullMetadata option.
// Embed the JSON results in TypeScript source files, then use the TypeScript compiler to confirm the corresponding types are compatible.
writeManifestFixtures("not-licensed@1.0.0");
writePackumentFixtures("not-licensed"); // Packument["license"] is optional.
writeManifestFixtures("tiny-tarball@1.0.0");
writePackumentFixtures("tiny-tarball");

async function writeManifestFixtures(spec: string) {
  await writeFixture(
    `test/fixtures/${spec}-abbreviated-manifest.ts`,
    await pacote.manifest(spec),
    "ManifestVersion",
    "ManifestResult"
  );
  await writeFixture(
    `test/fixtures/${spec}-manifest.ts`,
    await pacote.manifest(spec, { fullMetadata: true }),
    "PackumentVersion",
    "ManifestResult"
  );
}

async function writePackumentFixtures(spec: string) {
  await writeFixture(
    `test/fixtures/${spec}-abbreviated-packument.ts`,
    await pacote.packument(spec),
    "Manifest",
    "PackumentResult"
  );
  await writeFixture(
    `test/fixtures/${spec}-packument.ts`,
    await pacote.packument(spec, { fullMetadata: true }),
    "Packument",
    "PackumentResult"
  );
}

function writeFixture(
  filepath: string,
  metadata: unknown,
  metadataType: string,
  resultType: string
) {
  const source = `import * as pacote from "pacote";
import { ${metadataType} } from "../../";

export const metadata: ${metadataType} & pacote.${resultType} = ${JSON.stringify(
    metadata
  )};`;
  return fs.writeFile(filepath, prettier.format(source, { filepath }));
}

// https://github.com/npm/pacote/pull/175
declare module "pacote" {
  export interface PackumentResult {
    _cached: boolean;
  }
}
