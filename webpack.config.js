let path = require('path');
let webpack = require('webpack');

let env = process.env.WEBPACK_ENV || 'local';

if (env === 'production' || env === 'stage')
  {process.env.NODE_ENV = "production";}

let config = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    'babel-polyfill',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'content'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    modules: ['node_modules', './src'],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  loader: {
    configEnvironment: env,
  },
  node: {
    fs: 'empty',
  },
};

switch (env) {
  case 'production':
  case 'stage':
    config.devtool = false;
    config.entry = ['babel-polyfill', './src/index'];
    config.plugins = [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: {
          screw_ie8: true,
          warnings: false,
        },
        minify: {
          screw_ie8: true,
        },
      }),
    ];
    break;
}

module.exports = config;
