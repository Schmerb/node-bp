/* eslint-disable import/no-extraneous-dependencies */
/**
 *
 * Webpack Functions setup
 *
 *  */

const Dotenv = require('dotenv-webpack');

// @see https://github.com/netlify/netlify-lambda#webpack-configuration
module.exports = {
  plugins: [new Dotenv()],
};
