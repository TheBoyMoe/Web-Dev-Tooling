let StaticServer = require('static-server');

let server = new StaticServer({
	rootPath: './public',
	port: 3000
});

/* launch the server from the command prompt with 'node server.js' OR automatically via gulp watch */
server.start(function () {
	console.log(`Starting server on port ${server.port}`);
});