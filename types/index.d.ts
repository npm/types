// https://docs.npmjs.com/cli/v10/configuring-npm/package-json#people-fields-author-contributors
interface Contact {
  email?: string
  url?: string
  name: string
}

interface Signature {
  keyid: string
  sig: string
}

// https://docs.npmjs.com/cli/v10/configuring-npm/package-json#repository
interface Repository {
  directory?: string
  type?: string
  url: string
}

// https://docs.npmjs.com/cli/v10/configuring-npm/package-json#funding
interface Funding {
  type: string
  url: string
}

// https://docs.npmjs.com/cli/v10/configuring-npm/package-json#overrides
interface Overrides {
  [moduleName: string]: string | Overrides
}

// https://docs.npmjs.com/cli/v10/configuring-npm/package-json#peerdependenciesmeta
interface PeerDependencyMeta {
  optional: boolean
}

// https://docs.npmjs.com/cli/v10/configuring-npm/package-json#license
interface DeprecatedLicense {
  type: string
  url: string
}

/**
 * Dists are properties of Packument.versions
 * they have all the info you need to download and validate the tarball
 */
interface Dist {
  // deprecated?  (ref: found in uuid@0.0.2)
  bin?: Record<string, { shasum: string; tarball: string }>

  /**
   * the number of files in the tarball. this is on most packages published >= 2018
   */
  fileCount?: number

  /**
   * subresource integrity string! `npm view ssri`
   * https://w3c.github.io/webappsec-subresource-integrity/
   */
  integrity?: string

  /**
   * PGP signature for the tarball
   */
  'npm-signature'?: string

  /**
   * the sha1 sum of the tarball
   */
  shasum: string

  /**
   * Out-of-date blog post about this, below. (Says this is "npm-signature", but
   * that's not what the registry provides).
   * https://blog.npmjs.org/post/172999548390/new-pgp-machinery
   */
  signatures: Signature[]

  /**
   * the url to the tarball for the package version
   */
  tarball: string

  /**
   * the unpacked size of the files in the tarball. >= 2018
   */
  unpackedSize?: number
}

// this is in the tarball for the project. it really could have anything in it.
export interface PackageJSON {
  author?: Contact | string
  bin?: Record<string, string>
  browser?: Record<string, string> | string
  bugs?: Omit<Contact, 'name'> | string
  bundledDependencies?: string[] | boolean
  bundleDependencies?: string[] | boolean
  config?: Record<string, unknown>
  contributors?: (Contact | string)[]
  cpu?: string[]
  dependencies?: Record<string, string>
  description?: string
  devDependencies?: Record<string, string>
  directories?: Record<string, string>
  engines?: Record<string, string>
  files?: string[]
  funding?: Funding | string | (Funding | string)[]
  homepage?: string
  keywords?: string[]
  license?: string
  licenses?: DeprecatedLicense | DeprecatedLicense[]
  main?: string
  man?: string | string[]
  name: string
  optionalDependencies?: Record<string, string>
  os?: string[]
  overrides?: Overrides
  peerDependencies?: Record<string, string>
  peerDependenciesMeta?: Record<string, PeerDependencyMeta>
  private?: boolean
  publishConfig?: Record<string, unknown>
  repository?: Repository | string
  scripts?: Record<string, string>
  // https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html#editing-the-packagejson
  types?: string
  version: string
  workspaces?: string[] | Record<string, string>

  [field: string]: unknown
}

// Note: Contacts (bugs, author, contributors, repository, etc) can be simple
// strings in package.json, but not in registry metadata.

export interface PackumentVersion extends PackageJSON {
  _hasShrinkwrap?: boolean
  _id: string
  _nodeVersion?: string // optional (ref: not defined in uuid@1.4.0)
  _npmUser?: Contact
  _npmVersion: string
  author?: Contact
  browser?: string | Record<string, string> // ref: Record type found in uuid@1.4.1 et al
  bugs?: Omit<Contact, 'name'>
  contributors?: Contact[]
  deprecated?: string
  dist: Dist
  gitHead?: string
  maintainers?: Contact[]
  readme?: string
  readmeFilename?: string
  repository?: Repository
}

// this is what you get from the npm api.
export type Packument = {
  _cached?: boolean
  _id: string
  _rev: string
  'dist-tags': { latest?: string } & Record<string, string>
  time: { modified: string; created: string } & Record<string, string>
  users?: Record<string, true>
  versions: Record<string, PackumentVersion>

  // these fields are hoisted from the latest PackumentVersion
} & Pick<
  PackumentVersion,
  | 'author'
  | 'bugs'
  | 'contributors'
  | 'description'
  | 'homepage'
  | 'keywords'
  | 'license'
  | 'maintainers'
  | 'name'
  | 'readme'
  | 'readmeFilename'
  | 'repository'
>

export type ManifestVersion = Pick<
  PackumentVersion,
  | '_hasShrinkwrap'
  | 'bin'
  | 'bundleDependencies'
  | 'bundledDependencies'
  | 'dependencies'
  | 'deprecated'
  | 'devDependencies'
  | 'directories'
  | 'dist'
  | 'engines'
  | 'name'
  | 'optionalDependencies'
  | 'peerDependencies'
  | 'version'
>

/**
 * abbreviated metadata format (aka corgi)
 *
 * https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md#abbreviated-metadata-format
 * returned from registry requests with accept header values conianing
 * `application/vnd.npm.install-v1+json`
 */
export type Manifest = {
  modified: string
  versions: Record<string, ManifestVersion>
} & Pick<Packument, '_cached' | 'name' | 'dist-tags'>
