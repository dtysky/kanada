/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/17
 * Description: webpack config for development.
 */
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const tslintConfig = require('./tslintConfig');

module.exports = {
  watch: true,
  cache: true,
  debug: true,
  entry: {
    main: [path.resolve('./src/index.ts')]
  },

  output: {
    filename: 'kanata.js',
    path: path.resolve('./bin')
  },

  stats: {
    colors: true,
    reasons: true,
    errorDetails: true
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },

  module: {
    loaders: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {test: /\.tsx?$/, loader: "awesome-typescript-loader"}
    ],

    preLoaders: [
      {test: /\.ts$/, loader: 'tslint-loader'},
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {test: /\.js$/, loader: "source-map-loader"}
    ]
  },

  tslint: tslintConfig,

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({}),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        BROWSER: JSON.stringify(true)
      }
    })
  ]
};