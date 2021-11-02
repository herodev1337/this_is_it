const logger = require('./logger'),
    mongoose = require('mongoose')

module.exports = async () => {
    try {
        mongoose.connection
            .on('error', (err) => {
                logger(err, 'Database', 3)
            })
            .on('open', () => {
                logger('MongoDB connected successfully!', 'Database', 1)
            })
      
        await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true })
    } catch (error) {
        logger(error, 'Database', 3)
    }
}