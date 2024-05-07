# @npm/types

Typescript definitions for npm registry endpoints

For example:

```typescript
import * as npm from '@npm/types';

fetch('https://registry.npmjs.org/cookie)
  .then((res) => res.json())
  .then((obj: npm.Packument) => {
    // `obj` has proper registry types!
  })
```

## Types

### Packument
Type for data returned from by the `https://registry.npmjs.org/:packageName` endpoint

### PackumentVersion
Type for data returned from by the `https://registry.npmjs.org/:packageName/:packageVersion` endpoint.  Also the type of `Packument['versions']` entries.

### Manifest
Type for data returned from by the `https://registry.npmjs.org/:packageName` _when made with the 'Accept: application/vnd.npm.install-v1+json' header_

### ManifestVersion
Type for data returned from by the `https://registry.npmjs.org/:packageName/:packageVersion` _when made with the 'Accept: application/vnd.npm.install-v1+json' header_.   Also the type of `Manifest['versions']` entries.

### PackageJSON
A "loose" definition of the "package.json" file type.

> [!NOTE] This is not an authoritative definition of package.json structures.  It is merely a best-effort attempt to define the fields that may appear in `PackumentVersion` structures, are copied from a module's package.json file.