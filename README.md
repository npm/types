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
Response type for the `https://registry.npmjs.org/:packageName` endpoint

### PackumentVersion
Response type for the `https://registry.npmjs.org/:packageName/:packageVersion` endpoint.  Also the type of `Packument['versions']` entries.

### Manifest
Response type for the `https://registry.npmjs.org/:packageName` endpoint, _when made with the 'Accept: application/vnd.npm.install-v1+json' header_.

### ManifestVersion
Response type for the `https://registry.npmjs.org/:packageName/:packageVersion` endpoint, _when made with the 'Accept: application/vnd.npm.install-v1+json' header_.   Also the type of `Manifest['versions']` entries.

### PackageJSON
A "loose" definition of the "package.json" file type.

> [!NOTE] This is not an authoritative definition of package.json structures.  It is merely a best-effort attempt to define the fields that may appear in `PackumentVersion` structures, are copied from a module's package.json file.