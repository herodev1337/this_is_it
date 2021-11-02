const config = require('config')

require("./server/server.js").startServer();

if(config.RestAPI.enabled) { require("./api-server/server.js").startServer() }
