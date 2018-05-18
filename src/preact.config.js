/**
 * Function that mutates original webpack config.
 * Supports asynchronous changes when promise is returned.
 *
 * @param {object} config - original webpack config.
 * @param {object} env - options passed to CLI.
 * @param {WebpackConfigHelpers} helpers - object with useful helpers when working with config.
 **/
export default function(config, env, helpers) {
  if (env.production) {
    // https://stackoverflow.com/questions/45870467/error-in-bundle-js-from-uglifyjs-name-expected
    const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

    // Remove the other uglify JS plugin
    let uglifyIndex = -1;
    config.plugins.some((plugin, index) => {
      if (plugin.options && plugin.options.mangle) {
        uglifyIndex = index;
        return true;
      }
      return false;
    });

    if (uglifyIndex >= 0) {
      config.plugins.splice(uglifyIndex, 1);
      config.plugins.push(new UglifyJSPlugin());
    }
  }

  // Also, change our outpout directory
  // serving on github pages, so: wasmBoy/
  // https://github.com/developit/preact-cli/issues/218
  // https://github.com/developit/preact-cli/pull/323
  // TODO: Make this absolute for production: https://github.com/developit/preact-cli/issues/279
  config.output.publicPath = "";
}
