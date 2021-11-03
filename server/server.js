//Require modules
const path = require('path'),
    express = require('express'),
    helmet = require('helmet'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    //Custom Utils
    logger = require('../utils/logger'),
    networkInterfaces = require('../utils/networkInterfaces'),
    Post = require('../models/Post')
    require('../utils/db')();

const startServer = () => {
    //Variables
    const PORT = process.env.PORT || 3000 //Port for the app
    const app = express() //Init express


    app.engine('ejs', require('ejs-mate')) //use ejs-mate
    app.set('view engine', 'ejs') //Set View Engine to EJS
    app.set('views', 'server/views') //Change view path to ./server/views

    app.use(require('../middleware/logger.middleware')) //Use the Logger Middleware
    app.use(express.static('server/public')) //Set the public directory
    app.use(bodyParser.json()) // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
    app.use(cookieParser()) //Uses the cookieParser module
    app.use(helmet()) //helmet for setting http headers

    app.use(require("./router.js"))
    //Routes
    // app.use('/', require('./routes/app.route.js'))
    // app.use(require('./routes/auth.route.js'))
    // app.use('/api/quiz', require('./routes/api/quizApi.route.js'))
    // app.use('/api/post', require('./routes/api/postApi.route.js'))
    // app.use('/quiz', require('./routes/quiz.route.js'))

    // app.get("/editor", (req, res) => {
    //     res.render("admin/editor")
    // })

    // app.get("/posts", (req, res) => {
    //     Post.find({public: true}).then(responseData => { 
    //         res.render("posts", {posts : responseData})
    //     }).catch(err => {
    //         res.render("errors/404")
    //     })
        
    // })
    //Listen on PORT
    app.listen(PORT, () => {
        logger('Server is running!', 'Webserver')
        logger(`Local IP: http://127.0.0.1:${PORT}`, 'Webserver')
        networkInterfaces().forEach(ip => logger(`Public IP: http://${ip}:${PORT}`, 'Webserver'))
    })
}

module.exports = { startServer };