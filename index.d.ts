
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
  /**
   * "name <email> (website)" string or Maintainer object
   */
  author?: Maintainer;
  contributors?: Maintainer[];
  license?: string;
  repository?: Repository;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  bundleDependencies?: Record<string, string>;
  bundledDependencies?: Record<string, string>;
  engines?: Record<string, string>;
  files?: string[];
  bin?: Record<string, string>;
  man?: string|string[];
  directories?:Directories;
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
  publishConfig?:Record<string, string>;
}

// this is what you get from the npm api.
export interface Packument {
  name: string;
  readme?: string;
  description?: string;
  'dist-tags': {latest?: string}&Record<string, string>;
  versions: Record<string, PackumentVersion>;
  maintainers: Maintainer[];
  time: Record<string, string> & {modified: string; created: string};
  homepage?: string;
  keywords?: string[];
  repository?: Repository;
  author?: Maintainer;
  bugs?: {url: string};
  license: string;
  // left out users (stars) deprecated, and attachments (does nothing)
  readmeFilename?: string;
}
  
// https://docs.npmjs.com/files/package-lock.json
export interface PackageLock {
  name: string;
  version: string;
  lockfileVersion: number;
  packageIntegrity?: string;
  preserveSymlinks?: boolean;
  requires?: boolean;
  dependencies?: Record<string, LockDependency>;
}

export type Repository = {
  type?: string,
  url?: string
}|string;

interface Directories{
  bin?: string;
  lib?: string;
  man?: string;
  doc?: string;
  test?: string;
}


// this is what you get for each version in the npm api response.
export interface PackumentVersion extends PackageJson {
  gitHead?: string;
  /**
   * packagename@versionstring
   */
  id: string;
  npmVersion: string;
  nodeVersion: string;
  npmUser: Maintainer;
  maintainers: Maintainer[];
  dist: Dist;
  _hasShrinkwrap?: boolean;
  types?: string;
}

/**
 * abbreviated metadata format (aka corgi)
 *  
 * https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md#abbreviated-metadata-format
 * returned from registry requests with accept header values conianing
 * `application/vnd.npm.install-v1+json`
 */
export interface Manifest{
  name:string;
  modified:string;
  'dist-tags':Record<string, string>;
  versions:Record<string, ManifestVersion>
}

export interface ManifestVersion{
  name:string;
  version:string;
  dependencies?:Record<string, string>;
  optionalDependencies?:Record<string, string>;
  devDependencies?:Record<string, string>;
  bundleDependencies?:Record<string, string>;
  bundledDependencies?:Record<string, string>;
  peerDependencies?:Record<string, string>;
  bin?:Record<string, string>;
  _hasShrinkwrap?:boolean;
  directories?:Directories;
  dist:Dist;
  engines:Record<string, string>;
  deprecated?:string;
}

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
export type NpmScripts = Record<string, string>&{
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
  requires?: Record<string, string>;
  dependencies?: Record<string, LockDependency>;
}

export type Maintainer = {
  name?: string;
  email?: string;
  url?: string;
}|string;
