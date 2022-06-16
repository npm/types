import * as pacote from "pacote";
import { Packument } from "../../";

export const metadata: Packument & pacote.PackumentResult = {
  _id: "tiny-tarball",
  _rev: "4-6304ee8798a329dd688fa0886c0211a7",
  name: "tiny-tarball",
  description: "tiny tarball used for health checks",
  "dist-tags": { latest: "1.0.0" },
  versions: {
    "1.0.0": {
      name: "tiny-tarball",
      version: "1.0.0",
      description: "tiny tarball used for health checks",
      main: "index.js",
      scripts: { test: 'echo "Error: no test specified" && exit 1' },
      author: { name: "Ben Coe", email: "ben@npmjs.com" },
      license: "ISC",
      _id: "tiny-tarball@1.0.0",
      _shasum: "bbf102d5ae73afe2c553295e0fb02230216f65b1",
      _from: ".",
      _npmVersion: "2.7.0",
      _nodeVersion: "1.5.0",
      _npmUser: { name: "bcoe", email: "bencoe@gmail.com" },
      maintainers: [{ name: "bcoe", email: "bencoe@gmail.com" }],
      dist: {
        shasum: "bbf102d5ae73afe2c553295e0fb02230216f65b1",
        tarball:
          "https://registry.npmjs.org/tiny-tarball/-/tiny-tarball-1.0.0.tgz",
        integrity:
          "sha512-SxmEuEiq4d9L2UjUCyP7g3KHND65MJnsFbEwCbaoMp9NYjHjufAzIUCRaRHB+FNTwzZ1e2xjBoYobBB8pqB5IQ==",
      },
    },
  },
  readme:
    "# TinyTarball\n\ntiny-tarball used for health checks\n\n**don't unpublish me!**\n",
  maintainers: [{ name: "bcoe", email: "ben@npmjs.com" }],
  time: {
    modified: "2022-06-10T06:26:48.548Z",
    created: "2015-03-24T00:12:24.039Z",
    "1.0.0": "2015-03-24T00:12:24.039Z",
  },
  author: { name: "Ben Coe", email: "ben@npmjs.com" },
  license: "ISC",
  readmeFilename: "README.md",
  _cached: false,
  _contentLength: 0,
};
