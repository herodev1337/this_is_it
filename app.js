const path       = require('path');
const express    = require('express');
const bodyParser = require('body-parser')

const logger     = require(path.join(__dirname, 'server/utils/logger'));

const publicPath = path.join(__dirname, 'server/public');
const PORT       = process.env.PORT || 3000;
const app        = express()

//Set View Engine to EJS and change the view path to server/views/
app.engine('ejs', require('ejs-locals'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'server/views'));

//Use the Logger Middleware
app.use(require(path.join(__dirname, 'server/middleware/loggerMiddleware')))

//Use the Error Middleware
//app.use(require(path.join(__dirname, 'server/middleware/errorMiddleware')))

//Support URL-encoded bodies
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


//Set the public directory
app.use(express.static(publicPath));

//Main Route
var main = require('./server/routes/main.route.js');
app.use('/', main);

var auth = require('./server/routes/auth.route.js');
app.use('/', auth);

app.listen(PORT, () => {
    logger(`Server is running!`, 'Webserver')
    logger(`Local IP: http://localhost:${PORT}`, 'Webserver');

    Object.values(require("os").networkInterfaces())
    .flat()
    .filter(({ family, internal }) => family === "IPv4" && !internal)
    .map(({ address }) => logger(`Public IP: http://${address}:${PORT}`, 'Webserver'))
})