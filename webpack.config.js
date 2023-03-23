const path = require('path');
const { merge } = require('webpack-merge');

const platformConfig = require('@edx/frontend-build/config/webpack.dev.config');

const config = {
  entry: {
    app: path.resolve(process.cwd(), './src/index.html'),
  },
  
};

/* We need a slimmed version of webpack.dev.config.js 
 * specifically, we don't need the HTMLWebpackPlugin as Piral
 * emits index.jsx for us. We also don't need devServer since
 * Piral doing that for us. 
 * Modules are interfering with Piral's codegen. I have not
 * investigated too deeply yet. 
 */
platformConfig.plugins.shift();

delete platformConfig.devServer;
delete platformConfig.module;

const merged = merge(platformConfig, config);

// Log the slimmer version webpack config to the console.
console.log(merged);

module.exports = merged;

