import type * as npmTypes from '../../types/index.d.ts'

export const metadata: npmTypes.Manifest = {
  name: 'jarvis',
  'dist-tags': {
    latest: '0.0.1',
  },
  versions: {
    '0.0.1': {
      name: 'jarvis',
      version: '0.0.1',
      dependencies: {
        express: '2.4.6',
        less: '>= 0.0.1',
        jade: '>= 0.0.1',
      },
      dist: {
        shasum: 'b98548beebe27a6cbc1e21efbcf09a22b6fb0890',
        tarball: 'https://registry.npmjs.org/jarvis/-/jarvis-0.0.1.tgz',
        integrity:
          'sha512-+NEWR4rYvdbgppQFLAytdAjapRnLicGyuycxe6w67BvXiK4IEw8OYgwev+kCFY6vZZ1D5a1CKlw1oHXt1bhTdA==',
        signatures: [
          {
            keyid: 'SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA',
            sig: 'MEUCIQDKYjiTFD6ZPxWJt8KNRMzmN7KiMoab/K9juTp7+kOLoAIgIIpDAt+xPJRkXHzT7YioOFajAYkqZ71X+IAXRESfAbM=',
          },
        ],
      },
      engines: {
        node: '*',
      },
    },
  },
  modified: '2022-06-19T03:44:10.949Z',
}
