

import type * as npmTypes from '../../types/index.d.ts';


export const metadata: npmTypes.PackumentVersion = {
  "name": "uuid",
  "version": "1.4.1",
  "description": "Rigorous implementation of RFC4122 (v1 and v4) UUIDs.",
  "keywords": [
    "uuid",
    "guid",
    "rfc4122"
  ],
  "author": {
    "name": "Robert Kieffer",
    "email": "robert@broofa.com"
  },
  "contributors": [
    {
      "name": "Christoph Tavan",
      "email": "dev@tavan.de"
    }
  ],
  "main": "./uuid.js",
  "devDependencies": {
    "mocha": "1.8.0"
  },
  "scripts": {
    "test": "mocha test/test.js"
  },
  "browser": {
    "./rng.js": "./rng-browser.js"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/shtylman/node-uuid.git"
  },
  "testling": {
    "browsers": [
      "ie6..latest",
      "firefox/3.6..latest",
      "chrome/22..latest",
      "safari/5.1..latest"
    ],
    "harness": "mocha-tdd",
    "files": "test/*.js"
  },
  "_id": "uuid@1.4.1",
  "dist": {
    "shasum": "a337828580d426e375b8ee11bd2bf901a596e0b8",
    "tarball": "https://registry.npmjs.org/uuid/-/uuid-1.4.1.tgz",
    "integrity": "sha512-VvxWRJy+jqowMX1wClasj2BIORh82/X3wkRNNpXDOh1tUxmVAbdEWRUM+yRVg30a+XBmf+duDVtMgvRiuGq0qw==",
    "signatures": [
      {
        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA",
        "sig": "MEYCIQDGPgY/8s7EsZsplI7wUj9zkdvyAiFBNx8EMgYI37OuuQIhAPjpphlukLKOEBmORh7gaKymp9hSVj6dxl46neHEGac2"
      }
    ]
  },
  "_from": ".",
  "_npmVersion": "1.2.11",
  "_npmUser": {
    "name": "shtylman",
    "email": "shtylman@gmail.com"
  },
  "maintainers": [
    {
      "name": "broofa",
      "email": "robert@broofa.com"
    },
    {
      "name": "tim-smart",
      "email": "tim@fostle.com"
    },
    {
      "name": "shtylman",
      "email": "shtylman@gmail.com"
    }
  ],
  "directories": {},
  "deprecated": "Please upgrade to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details."
};
