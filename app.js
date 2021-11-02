const config = require('config')

const webserver = require("./server/server.js");
webserver.startServer()

if(config.RestAPI.enabled) { require("./api-server/server.js").startServer() }
