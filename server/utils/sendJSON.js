const chalk = require('chalk')
const logger = require('./logger')
/**
 * Sends data to the client
 * @param  {} res - response 
 * @param  {Object} data - { data: <DATA> }
 */
 const sendData = (res, data) => {
    return res.status(200).json({ 
        error: null,
        data: data
    })
}

/**
 * Sends an error to the client
 * TODO: next? error handling
 * @param  {} res - response 
 * @param  {} req - request
 * @param  {String} error - Error message
 */
const sendError = (res, req, error) => {
    logger(`${chalk.cyan(req.ip)} throwed error ${chalk.bgRed(error)}`, 'Quiz Controller', 3)
    return res.status(400)
    .json({
        error: error
    })
}

module.exports = {
    sendData,
    sendError
}