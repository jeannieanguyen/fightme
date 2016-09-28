import bodyParser from 'body-parser';
import path from 'path';
import mime from 'mime';
import fs from 'fs';
import uuid from 'node-uuid';
import mkdirp from 'mkdirp';
import config from 'config';

const SIZE_LIMIT = config.get('server.postLimit');

export default function(app) {
	app.use(bodyParser.raw({
		inflate: true,
		limit: SIZE_LIMIT,
		type: 'image/*'
	}));
}
