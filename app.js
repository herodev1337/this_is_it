//Require modules
const path = require('path'),
  express = require('express'),
  helmet = require('helmet'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  //Custom Utils
  logger = require(path.join(__dirname, 'server/utils/logger')),
  networkInterfaces = require('./server/utils/networkInterfaces'),
  db = require('./server/utils/db')(),
  cors = require('cors');

//Variables
const PORT = process.env.PORT || 3000; //Port for the app
const app = express(); //Init express

app.engine('ejs', require('ejs-locals')); //use ejs-locals
app.set('view engine', 'ejs'); //Set View Engine to EJS
app.set('views', path.join(__dirname, 'server/views')); //Change view path to ./server/views

app.use(require(path.join(__dirname, 'server/middleware/logger.middleware'))); //Use the Logger Middleware
app.use(express.static(path.join(__dirname, 'server/public'))); //Set the public directory
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser()); //Uses the cookieParser module


//Routes
app.use(require('./server/routes/app.route.js'));
app.use(require('./server/routes/auth.route.js'));

//Listen on PORT
app.listen(PORT, () => {
  logger('Server is running!', 'Webserver');
  logger(`Local IP: http://127.0.0.1:${PORT}`, 'Webserver');
  networkInterfaces().forEach(ip =>
    logger(`Public IP: http://${ip}:${PORT}`, 'Webserver')
  );
});
