const path = require('path');
const { createConfig } = require('@edx/frontend-build');

const config =  createConfig('webpack-piral', {
  entry: {
    app: path.resolve(process.cwd(), './src/index.html'),
  },
});

delete config.output;

console.log(config);

module.exports = config;
/*

const path = require('path');
const { merge } = require('webpack-merge');

const platformConfig = require('@edx/frontend-build/config/webpack.dev.config');

const config = {
  entry: {
    app: path.resolve(process.cwd(), './src/index.html'),
  },
  
};

platformConfig.plugins.shift();

delete platformConfig.devServer;
delete platformConfig.module;

const merged = merge(platformConfig, config);

// Log the slimmer version webpack config to the console.
console.log(merged);

module.exports = merged;

*/
