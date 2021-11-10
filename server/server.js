//Require modules
const path = require('path'),
  express = require('express'),
  helmet = require('helmet'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  //Custom Utils
  logger = require('./utils/logger'),
  networkInterfaces = require('./utils/networkInterfaces'),
  Post = require('./models/Post');
require('./utils/db')();
const cors = require('cors')

//Variables
const PORT = process.env.PORT || 3000; //Port for the app
const app = express(); //Init express

app.use(require('./middleware/logger.middleware')); //Use the Logger Middleware
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser()); //Uses the cookieParser module
app.use(helmet()); //helmet for setting http headers
app.use(cors())

// app.use(require('./router.js'));
app.use('/api/', require('./routes/api/quizApi.route'))

//Listen on PORT
app.listen(PORT, () => {
  logger('Server is running!', 'Webserver');
  logger(`Local IP: http://127.0.0.1:${PORT}`, 'Webserver');
  networkInterfaces().forEach(ip =>
    logger(`Public IP: http://${ip}:${PORT}`, 'Webserver')
  );
});
