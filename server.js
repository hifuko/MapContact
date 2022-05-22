const http = require('http');
const app = require('./rest');
const port = process.env.PORT || 3001;
const server = http.createServer(app);

server.listen(port);