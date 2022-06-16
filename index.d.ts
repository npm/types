
// this is in the tarball or the project. it really could have anything in it.
export interface PackageJson {
  name: string;
  version: string;
  description?: string;
  main?: string;
  browser?: string;
  scripts?: NpmScripts;
  /**
   * these help npm searches find your project
   */
  keywords?: string[];
  homepage?: string;
  bugs?: NonNullable<PackumentVersion['bugs']> | string;
  /**
   * "name <email> (website)" string or Maintainer object
   */
  author?: NonNullable<PackumentVersion['author']> | string;
  contributors?: (
    | NonNullable<PackumentVersion['contributors']>[number]
    | string
  )[];
  license?: string;
  repository?: NonNullable<PackumentVersion['repository']> | string;
  dependencies?: Dependencies;
  devDependencies?: Dependencies;
  peerDependencies?: Dependencies;
  bundleDependencies?: NonNullable<PackageJson['bundledDependencies']>;
  bundledDependencies?: string[] | boolean;
  optionalDependencies?: ObjectOfStrings;
  engines?: ObjectOfStrings;
  files?: string[];
  bin?: {[key: string]: string};
  man?: string|string[];
  directories?:Directories;
  config?: Record<string, unknown>;
  os?: string[];
  cpu?: string[];
  /**
   * types for the package. unofficial but defacto for typescript.
   */
  types?: string;
  /**
   * prevents npm publish
   */
  private?: boolean;
  /**
   * npm config values for publish time. like setting an alternate registry
   */
  publishConfig?: Record<string, unknown>;
  [field: string]: unknown;
}

// this is what you get from the npm api.
export type Packument = {
  _id: string;
  _rev: string;
  'dist-tags': {latest: string}&ObjectOfStrings;
  versions: {[key: string]: PackumentVersion};
  time: {modified: string, created: string, [key: string]: string};
  users?: Record<string, true>;
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
  name: string;
  version: string;
  lockfileVersion: number;
  packageIntegrity?: string;
  preserveSymlinks?: boolean;
  requires?: boolean;
  dependencies?: {[moduleName: string]: LockDependency};
}

export interface Repository {
  type?: string;
  url: string;
  directory?: string;
}

interface Directories{
  bin?: string;
  lib?: string;
  man?: string;
  doc?: string;
  test?: string;
}


// this is what you get for each version in the npm api response.
export interface PackumentVersion extends PackageJson {
  // bugs, author, contributors, and repository can be simple strings in package.json, but not in registry metadata.
  bugs?: {
    url?: string;
    email?: string;
  };
  author?: Maintainer;
  contributors?: Maintainer[];
  repository?: Repository;
  gitHead?: string;
  /**
   * packagename@versionstring
   */
  _id: string;
  _npmVersion: string;
  _nodeVersion: string;
  _npmUser: Maintainer;
  maintainers: Maintainer[];
  dist: Dist;
  readme?: string;
  readmeFilename?: string;
  _hasShrinkwrap?: boolean;
  deprecated?: string;
}

/**
 * abbreviated metadata format (aka corgi)
 *  
 * https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md#abbreviated-metadata-format
 * returned from registry requests with accept header values conianing
 * `application/vnd.npm.install-v1+json`
 */
export type Manifest = {
  modified:string;
  versions:{[version:string]:ManifestVersion}
} & Pick<Packument, 'name' | 'dist-tags'>;

export type ManifestVersion = Pick<
  PackumentVersion,
  | 'name'
  | 'version'
  | 'bin'
  | 'directories'
  | 'dependencies'
  | 'devDependencies'
  | 'peerDependencies'
  | 'bundledDependencies'
  | 'optionalDependencies'
  | 'engines'
  | 'dist'
  | '_hasShrinkwrap'
  | 'deprecated'
>;

/**
 * Dists are properties of Packument.versions
 * they have all the info you need to download and validate the tarball
 */
export interface Dist {
  /**
   * the url to the tarball for the package version
   */
  tarball: string;
  /**
   * the sha1 sum of the tarball
   */
  shasum: string;
  /**
   * subresource integrity string! `npm view ssri`
   * https://w3c.github.io/webappsec-subresource-integrity/
   */
  integrity?: string;
  /**
   * the number of files in the tarball. this is on most packages published >= 2018
   */
  fileCount?: number;
  /**
   * the unpacked size of the files in the tarball. >= 2018
   */
  unpackedSize?: number;
  /**
   * pgp signed package signature 
   * https://blog.npmjs.org/post/172999548390/new-pgp-machinery
   */
  'npm-signature'?: string;
}

// https://docs.npmjs.com/misc/scripts
export type NpmScripts = ObjectOfStrings&{
  test?: string;
  pretest?: string;
  posttest?: string;
  install?: string;
  preinstall?: string;
  postinstall?: string;
  uninstall?: string;
  preuninstall?: string;
  postuninstall?: string;
  prepublish?: string;
  prepare?: string;
  prepublishOnly?: string;
  prepack?: string;
  postpack?: string;
  version?: string;
  preversion?: string;
  postversion?: string;
  stop?: string;
  prestop?: string;
  poststop?: string;
  restart?: string;
  prerestart?: string;
  postrestart?: string;
  shrinkwrap?: string;
  preshrinkwrap?: string;
  postshrinkwrap?: string;
};


export interface LockDependency {
  version: string;
  integrity?: string;
  resolved?: string;
  bundled?: boolean;
  dev?: boolean;
  optional?: boolean;
  requires?: {[moduleName: string]: string};
  dependencies?: {[moduleName: string]: LockDependency};
}

export interface Maintainer {
  name: string;
  email?: string;
  url?: string;
}

interface ObjectOfStrings {
  [key: string]: string;
}

interface Dependencies {
  [moduleName: string]: string;
}
