require('dotenv').config()

const withPlugins = require('next-compose-plugins')
const withSass = require('@zeit/next-sass');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = withPlugins([
  withSass({
    webpack: config => {
      // Fixes npm packages that depend on `fs` module
      config.node = {
        fs: 'empty'
      }

      config.plugins = config.plugins || [];
      config.plugins = [
        ...config.plugins,

        // Read the .env file
        new Dotenv({
          path: path.join(__dirname, '.env'),
          systemvars: true
        })
      ]
      return config
    }
  }),
]);
