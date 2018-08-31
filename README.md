# @npm/types

Typescript definitions for npm registry content

```typescript
import * as npm from '@npm/types';

const pkg = require('pacote');

pkg.packument('libnpm').then((obj: npm.Packument) => {
  console.log(obj.name, 'is the name of the package');
});

```

## GOAL

Make it easier for typescript users to work with npm registry content! 

![vscode tooltip screenshot](./img/tool-tip.png)

Types should have comments so documentation on npm object properties can appear in vscode contextual popups.

## types

- npm.PackageJson
    - the object in the json file you have in your project

- npm.PackageLock
    - the file generated for you by npm that pins your deps.

- npm.Packument
    - the document you get from `https://registry.npmjs.org/<package name here>`

- npm.Manifest
    - the document you get from `curl -H 'accept:application/vnd.npm.install-v1+json' https://registry.npmjs.org/<package name here>`

### subtypes


- npm.PackageVersion
    - the objects in the version fields of Packuments

- npm.LockDependency
    - how package locks describe dependencies and sub dependencies

- npm.ManifestVersion  
    - the version object in an AbbreviatedPackument

- npm.Dist
    - the object in npm.PackageVersion that holds the tarball location and checksums

- npm.NpmScripts
    - helpful object with all of the possible npm hooks

- npm.Maintainer
    - common type for author, maintainers etc used in many objects

- npm.Repository
    - string or object of repo data
