// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    /* ... */
  },
  plugins: [
    /* ... */
  ],
  packageOptions: {
    polyfillNode: true,
  },
  devOptions: {
    output: "stream",
  },
  buildOptions: {
    /* ... */
  },
};
