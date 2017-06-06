'use strict';
const StaticServer = require('static-server');

// dev server
const server = new StaticServer({
	rootPath: './src/',
	port: 3000
});
server.start(() => console.log(`Static is running on port ${server.port}`));