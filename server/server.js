//Require modules
const path = require('path'),
  express = require('express'),
  helmet = require('helmet'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  cors = require('cors'),
  //Custom Utils
  logger = require('./utils/logger'),
  networkInterfaces = require('./utils/networkInterfaces'),
  Post = require('./models/Post'),
  
  process = require('process')
  process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";
  const config = require("config")

  require('./utils/db')();

//Variables
const PORT = process.env.PORT || 3000; //Port for the app
const app = express(); //Init express

app.use(require('./middleware/logger.middleware')); //Use the Logger Middleware
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser()); //Uses the cookieParser module
app.use(helmet()); //helmet for setting http headers
app.use(cors({credentials: true, origin: ["http://localhost:8080", "http://localhost:8081"]}));

app.get('/', (req, res) => res.status(200).send("This is IT REST API | Token -> " + req.cookies.auth_token))
app.use('/api/users/', require('./routes/userApi.route'))
app.use('/api/posts/', require('./routes/postApi.route'))
app.use('/api/quizzes/', require('./routes/quizApi.route'))
app.use('/api/', require('./routes/auth.route'))
app.use('/api/', require('./routes/group.route'))

//Listen on PORT
app.listen(PORT, () => {
  logger('Server is running!', 'Webserver');
  logger(`Local IP: http://127.0.0.1:${PORT}`, 'Webserver');
  networkInterfaces().forEach(ip =>
    logger(`Public IP: http://${ip}:${PORT}`, 'Webserver')
  );
});
