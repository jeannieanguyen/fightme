var path = require('path');
var webpack = require('webpack');
var env = process.env.WEBPACK_ENV || 'local';

if (env === 'production' || env === 'stage')
    process.env.NODE_ENV = 'production';

var config = {
    devtool: 'inline-source-map',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        'babel-polyfill',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'content'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src'),
        }, {
            test: /\.scss$/,
            loaders: ['style','css','sass'],
            include: path.join(__dirname, 'src/styles')
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    loader: {
        configEnvironment: env
    }
};

switch(env) {
    case 'production':
    case 'stage':
        config.devtool = false;
        config.entry = [
            'babel-polyfill',
            './src/index'
        ];
        config.plugins = [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            new webpack.optimize.UglifyJsPlugin({
                minimize: true,
                compress: {
                    screw_ie8: true,
                    warnings: false
                },
                minify: {
                    screw_ie8: true
                }
             })
        ];
        break;
}

module.exports = config;
