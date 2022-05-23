import * as pacote from "pacote";
import { PackumentVersion } from "../../";

export const metadata: PackumentVersion & pacote.ManifestResult = {
  name: "tiny-tarball",
  version: "1.0.0",
  description: "tiny tarball used for health checks",
  main: "index.js",
  scripts: { test: 'echo "Error: no test specified" && exit 1' },
  author: { name: "Ben Coe", email: "ben@npmjs.com" },
  license: "ISC",
  _id: "tiny-tarball@1.0.0",
  _shasum: "bbf102d5ae73afe2c553295e0fb02230216f65b1",
  _from: "tiny-tarball@1.0.0",
  _npmVersion: "2.7.0",
  _nodeVersion: "1.5.0",
  _npmUser: { name: "bcoe", email: "bencoe@gmail.com" },
  maintainers: [{ name: "bcoe", email: "bencoe@gmail.com" }],
  dist: {
    shasum: "bbf102d5ae73afe2c553295e0fb02230216f65b1",
    tarball: "https://registry.npmjs.org/tiny-tarball/-/tiny-tarball-1.0.0.tgz",
    integrity:
      "sha512-SxmEuEiq4d9L2UjUCyP7g3KHND65MJnsFbEwCbaoMp9NYjHjufAzIUCRaRHB+FNTwzZ1e2xjBoYobBB8pqB5IQ==",
  },
  _resolved: "https://registry.npmjs.org/tiny-tarball/-/tiny-tarball-1.0.0.tgz",
  _integrity:
    "sha512-SxmEuEiq4d9L2UjUCyP7g3KHND65MJnsFbEwCbaoMp9NYjHjufAzIUCRaRHB+FNTwzZ1e2xjBoYobBB8pqB5IQ==",
};
