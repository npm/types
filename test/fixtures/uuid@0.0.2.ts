
import type * as npmTypes from '../../types/index.d.ts'

export const metadata: npmTypes.PackumentVersion = {
  name: 'uuid',
  description: 'Simple libuuid bindings to allow UUIDs to be generated from JS.',
  version: '0.0.2',
  author: {
    name: 'Nikhil Marathe',
  },
  repository: {
    type: 'hg',
    url: 'http://bitbucket.org/nikhilm/uuidjs',
  },
  engine: [
    'node >=0.1.103',
  ],
  scripts: {
    preinstall: 'node-waf configure && node-waf build',
  },
  main: 'build/default/uuid',
  _id: 'uuid@0.0.2',
  engines: {
    node: '*',
  },
  _nodeSupported: true,
  _npmVersion: '0.2.7-2',
  _nodeVersion: 'v0.3.1-pre',
  dist: {
    tarball: 'https://registry.npmjs.org/uuid/-/uuid-0.0.2.tgz',
    bin: {
      '0.4-sunos-5.11': {
        shasum: '2ff8d977261ddadfd1446cee661ab87863659e45',
        tarball: 'http://registry.npmjs.org/uuid/-/uuid-0.0.2-0.4-sunos-5.11.tgz',
      },
    },
    shasum: '3171f2c4f58895b8b307692a335fb2349ddf6733',
    integrity: 'sha512-3h/4V/B5W+7FmanZTk1bQMDDoNstFk/2xy0W2W1s1WX8NPU2Sgrfi3GXZQvhqVZZiQAA7A7uUgOB4xzy0ngraA==',
    signatures: [
      {
        keyid: 'SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA',
        sig: 'MEYCIQD1IQ4S7SggRuiiTxjJVzzfkHVzcPpPso/A+N++TgXqAgIhAP+LCzmHoT6q26ofm8BifbpLqynMNyNtpYHPSz7covx/',
      },
    ],
  },
  directories: {},
  deprecated: 'Please upgrade to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.',
}
