const logger = require('../utils/logger');
const chalk = require('chalk');

module.exports = (req, res, next) => {
    logger(`${chalk.cyan(req.ip)} - ${chalk.green(req.method)} - ${req.path}`, 'Webserver Request Middleware', 0);
    next();
}