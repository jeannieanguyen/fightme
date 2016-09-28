import path from 'path';
import express from 'express';
import config from 'config';

import routes from './routes';

const isProduction = process.env.NODE_ENV === 'production';
const port = config.get('server.port');
const address = config.get('server.address');
const app = express();

if (!isProduction) {
    const webpack = require('webpack');
    const webpackMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackConfig = require('../webpack.config.js');

    const compiler = webpack(webpackConfig);
    const middleware = webpackMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: { colors: true }
    });
    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
}

routes(app);
app.use(express.static(path.join(__dirname,'..')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../content/index.html'));
});

app.listen(port, address, err => {
	if (err) {
		console.log(err);
	}
	console.info('Listening on http://%s:%s', address, port);
});
