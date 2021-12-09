import mongoose from 'mongoose'
import config from 'config'
import log from './logger'

/**
 * Connects to the DB
 */
async function connect(){
    const dbUrl = config.get<string>('dbUrl')

    return mongoose.connect(dbUrl).then(() => {
        log.info("Database connection established!")
    }).catch((error) => {
        log.error("Database connection error -> ", error)
        process.exit(1)
    })
}

export default connect