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
Type for data returned from by the `https://registry.npmjs.org/:packageName/:packageVersion` endpoint.  Also the type of `Packument['versions']`

### Manifest
Type for data returned from by the `https://registry.npmjs.org/:packageName` __when made with the 'Accept: application/vnd.npm.install-v1+json' header__

### ManifestVersion
Type for data returned from by the `https://registry.npmjs.org/:packageName/:packageVersion` __when made with the 'Accept: application/vnd.npm.install-v1+json' header__

### PackageJSON
"package.json" file type.

> [!NOTE] This is a "loose" definition of the package.json structure, and is provided here only to the extent in which it aids in the definiton of the `PackumentVersion` type.