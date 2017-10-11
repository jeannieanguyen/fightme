var path = require('path');
var webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
require('./lib/gateway/apigClient');
var env = process.env.WEBPACK_ENV || 'local';

if (env === 'production' || env === 'stage')
    process.env.NODE_ENV = 'production';

module.exports = {
  target: 'node', // webpack should compile node compatible code
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  resolve: {
      modules: ['node_modules', './src'],
      extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query:
            {
                presets: ["env", "es2017", "stage-0", "stage-1", "stage-2", "react"],
            },
      },
    ]
  },
};
