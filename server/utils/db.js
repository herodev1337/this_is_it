const logger = require('./logger'),
    mongoose = require('mongoose'),
    config = require('config');

module.exports = async () => {
    try {
        mongoose.connection
            .on('error', (err) => {
                logger(err, 'Database', 3)
            })
            .on('open', () => {
                logger('MongoDB connected successfully!', 'Database', 1)
            })
      
        await mongoose.connect(config.dbConfig.uri, { useNewUrlParser: true })
    } catch (error) {
        logger(error, 'Database', 3)
    }
}