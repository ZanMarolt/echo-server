var server = require('./server');

server.startServer(() => {
	server.startRouter();
});
