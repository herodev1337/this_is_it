const path       = require('path');
const http       = require('http');
const express    = require('express');

const logger     = require(path.join(__dirname, 'server/utils/helpers/logger'));

const publicPath = path.join(__dirname, 'server/public');
const PORT       = process.env.PORT || 3000;
const app        = express()

//Set View Engine to EJS and change the view path to server/views/
app.engine('ejs', require('ejs-locals'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'server/views'));

//Set the public directory
app.use(express.static(publicPath));

var main = require('./server/routes/main.route.js');
app.use('/', main);

app.listen(PORT, () => {
    logger(`Server is running!`, 'Webserver')
    logger(`Local IP: http://localhost:${PORT}`, 'Webserver');

    Object.values(require("os").networkInterfaces())
    .flat()
    .filter(({ family, internal }) => family === "IPv4" && !internal)
    .map(({ address }) => logger(`Public IP: http://${address}:${PORT}`, 'Webserver'))
})