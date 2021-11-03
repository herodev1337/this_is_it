//Require modules
const path = require('path'),
    express = require('express'),
    helmet = require('helmet'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    //Custom Utils
    logger = require('../utils/logger'),
    networkInterfaces = require('../utils/networkInterfaces')
    require('../utils/db')();

const startServer = () => {
    //Variables
    const PORT = process.env.REST_PORT || 3001 //Port for the app
    const app = express() //Init express

    app.use(require('../middleware/logger.middleware')) //Use the Logger Middleware
    app.use(bodyParser.json()) // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
    app.use(cookieParser()) //Uses the cookieParser module
    app.use(helmet()) //helmet for setting http headers

    app.use(require("./router.js"))

    //Listen on PORT
    app.listen(PORT, () => {
        logger('Server is running!', 'REST API')
        logger(`Local IP: http://127.0.0.1:${PORT}`, 'REST API')
        networkInterfaces().forEach(ip => logger(`Public IP: http://${ip}:${PORT}`, 'REST API'))
    })
}

module.exports = { startServer };