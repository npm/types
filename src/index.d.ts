

//export as namespace npm;
// https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md

declare namespace npm {
  // this is in the tarball or the project. it really could have anything in it.
  export interface PackageJson {
    name: string;
    version: string;
    description?: string;
    main?: string;
    browser?: string;
    scripts?: NpmScripts;
    keywords?: string[];
    author?: string|Person;
    contributors?: Person[];
    license?: string;
    repository?: Repository;
    depedencies?: Dependencies;
    devDependencies?: Dependencies;
    peerDependencies?: Dependencies;
    bundleDependencies?: Dependencies;
    bundledDependencies?: Dependencies;
    engines?: {[key: string]: string};
    files?: string[];
    bin?: {[key: string]: string};
    man?: string|string[];
    directories?:
        {bin?: string, lib?: string, man?: string, doc?: string, test?: string};
    // should add these to types for typescript as its here you are the most
    // likely to expect them.
    types?: string;
    typings?: string;
  }

  // this is what you get from the npm api.
  export interface Packument {
    name: string;
    readme?: string;
    description?: string;
    'dist-tags': {latest?: string}&ObjectOfStrings;
    versions: {[key: string]: PackumentVersion};
    maintainers: Person[];
    time: {modified: string, created: string, [key: string]: string};
    homepage?: string;
    keywords?: string[];
    repository?: Repository;
    author?: {name: string};
    bugs?: {url: string};
    license: string;
    // left out users (stars) deprecated, and attachments (does nothing)
    readmeFilename?: string;
  }

  interface Dependencies {
    [key: string]: string;
  }

  interface Person {
    name?: string;
    email?: string;
    url?: string;
  }

  export type Repository = {
    type?: string,
    url?: string
  }|string;

  // this is what you get for each version in the npm api response.
  export interface PackumentVersion extends PackageJson {
    gitHead?: string;
    // special packagename@versionstring
    id: string;
    npmVersion: string;
    nodeVersion: string;
    npmUser: {name: string, email: string};
    maintainers: [{email: string, name: string}];
    dist: Dist;
    _hasShrinkwrap?: boolean;
    types?: string;
    typings?: string;
  }

  export interface Dist {
    // for versions since the dawn of time
    tarball: string;
    shasum: string;
    // amazing fields added recently
    integrity?: string;
    fileCount?: number;
    unpackedSize?: number;
    // https://blog.npmjs.org/post/172999548390/new-pgp-machinery
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

  interface ObjectOfStrings {
    [key: string]: string;
  }
  
  // https://docs.npmjs.com/files/package-lock.json
  export interface PackageLock {
    name: string;
    version: string;
    lockfileVersion: number;
    packageIntegrity?: string;
    preserveSymlinks?: boolean;
    requires?: boolean;
    dependencies?: {[moduleName: string]: Dependency};
  }
  
  export interface Dependency {
    version: string;
    integrity?: string;
    resolved?: string;
    bundled?: boolean;
    dev?: boolean;
    optional?: boolean;
    requires?: {[moduleName: string]: string};
    dependencies?: {[moduleName: string]: Dependency};
  }
}
