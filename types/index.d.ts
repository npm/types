// this is what you get for each version in the npm api response.
export interface PackumentVersion extends PackageJson {
  // bugs, author, contributors, and repository can be simple strings in package.json, but not in registry metadata.
  bugs?: {
    url?: string;
    email?: string;
  };
  author?: Maintainer;
  // ref: Record type found in uuid@1.4.1 et al
  browser?: Record<string, string>;
  contributors?: Maintainer[];
  repository?: Repository;
  gitHead?: string;
  _id: string;
  _npmVersion: string;

  // Optional (ref: not defined in uuid@1.4.0)
  _nodeVersion?: string;

  _npmUser?: Maintainer;
  maintainers?: Maintainer[];
  dist: Dist;
  readme?: string;
  readmeFilename?: string;
  _hasShrinkwrap?: boolean;
  deprecated?: string;
}

// this is in the tarball or the project. it really could have anything in it.
export interface PackageJson {
  /**
   * "name <email> (website)" string or Maintainer object
   */
  author?: NonNullable<PackumentVersion['author']> | string;
  bin?: Record<string, string>;
  browser?: PackumentVersion['browser'] | string;
  bugs?: NonNullable<PackumentVersion['bugs']> | string;
  bundledDependencies?: string[] | boolean;
  bundleDependencies?: string[] | boolean;
  config?: Record<string, unknown>;
  contributors?: PackumentVersion['contributors'] | string[];
  cpu?: string[];
  dependencies?: Record<string, string>;
  description?: string;
  devDependencies?: Record<string, string>;
  directories?: Directories;
  engines?: Record<string, string>;
  files?: string[];
  homepage?: string;
  keywords?: string[];
  license?: string;
  main?: string;
  man?: string | string[];
  name: string;
  optionalDependencies?: Record<string, string>;
  os?: string[];
  peerDependencies?: Record<string, string>;
  private?: boolean;
  publishConfig?: Record<string, unknown>;
  repository?: NonNullable<PackumentVersion['repository']> | string;
  scripts?: Record<string, string>;
  types?: string;
  version: string;

  [field: string]: unknown;
}

// this is what you get from the npm api.
export type Packument = {
  _cached?: boolean;
  _id: string;
  _rev: string;
  'dist-tags': {latest?: string} & Record<string, string>;
  time: {modified: string; created: string} & Record<string, string>;
  users?: Record<string, true>;
  versions: Record<string, PackumentVersion>;

  // The following fields are hoisted to the top-level of the packument from the latest version published.
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
>;

// https://docs.npmjs.com/files/package-lock.json
export interface PackageLock {
  dependencies?: Record<string, LockDependency>;
  lockfileVersion: number;
  name: string;
  packageIntegrity?: string;
  preserveSymlinks?: boolean;
  requires?: boolean;
  version: string;
}

export interface Repository {
  directory?: string;
  type?: string;
  url: string;
}

interface Directories {
  bin?: string;
  doc?: string;
  lib?: string;
  man?: string;
  test?: string;
}

/**
 * abbreviated metadata format (aka corgi)
 *
 * https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md#abbreviated-metadata-format
 * returned from registry requests with accept header values conianing
 * `application/vnd.npm.install-v1+json`
 */
export type Manifest = {
  modified: string;
  versions: Record<string, ManifestVersion>;
} & Pick<Packument, '_cached' | 'name' | 'dist-tags'>;

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
>;

/**
 * Dists are properties of Packument.versions
 * they have all the info you need to download and validate the tarball
 */
export interface Dist {
  // Deprecated?  (ref: found in uuid@0.0.2)
  bin?: Record<string, {shasum: string; tarball: string}>;

  /**
   * the number of files in the tarball. this is on most packages published >= 2018
   */
  fileCount?: number;

  /**
   * subresource integrity string! `npm view ssri`
   * https://w3c.github.io/webappsec-subresource-integrity/
   */
  integrity?: string;

  /**
   * PGP signature for the tarball
   */
  'npm-signature'?: string;

  /**
   * the sha1 sum of the tarball
   */
  shasum: string;

  /**
   * Out-of-date blog post about this, below. (Says this is "npm-signature", but
   * that's not what the registry provides).
   * https://blog.npmjs.org/post/172999548390/new-pgp-machinery
   */
  signatures: Signature[];

  /**
   * the url to the tarball for the package version
   */
  tarball: string;

  /**
   * the unpacked size of the files in the tarball. >= 2018
   */
  unpackedSize?: number;
}

export interface Signature {
  keyid: string;
  sig: string;
}

// TODO: Remove?
//
// The NPM registry doesn't publish lock files, so having this type here is a bit... awkward
export interface LockDependency {
  version: string;
  integrity?: string;
  resolved?: string;
  bundled?: boolean;
  dev?: boolean;
  optional?: boolean;
  requires?: Record<string, string>;
  dependencies?: Record<string, LockDependency>;
}

export interface Maintainer {
  name: string;
  email?: string;
  url?: string;
}
