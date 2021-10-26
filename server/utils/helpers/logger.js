const chalk = require('chalk');
const date  = require('./date.js');
const _     = require('lodash');

module.exports = function (message, job="Main Thread", status=1){

    //Switching between status
    switch(status){
        case 0: //DEBUG
            status = chalk.blue('DEBUG');
            break;
        case 1: //LOG
            status = chalk.green('LOG  ');
            break;
        case 2: //WARN
            status = chalk.yellow('WARN ');
            break;
        case 3: //ERROR
            status = chalk.red('ERROR');
            break;
        default: //LOG 
            status = chalk.green('LOG  ');
            break;
    }

    //Generate the whitespace after the job to ensure the design of the logger
    job += " ".repeat(30 - job.length)

    //Log it
    console.log(`[${chalk.gray(date('j F Y g:i'))}] ${status} ${chalk.magenta(job)} | ${message}`);
    return true;
}