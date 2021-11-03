const logger = require("../../utils/logger");
const chalk = require("chalk");

module.exports = (err, res) => {
  logger(
    `${chalk.cyan(req.ip)} - ${chalk.green(req.method)} - ${req.path}`,
    "Webserver Error Middleware",
    3
  );
  res.status(404).render("../views/errors/404.ejs");
};
