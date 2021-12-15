import mongoose, { ConnectOptions } from 'mongoose'
import config from 'config'
import log from './logger'

/**
 * Connects to the DB
 */
async function connect(){
    const dbUrl = config.get<string>('dbUrl')
    return mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions).then(() => {
        log.info("Database connection established!")
    }).catch((error: any) => {
        console.error(error)
        log.error("Database connection error -> ", error.message)
        process.exit(1)
    })
}

export default connect