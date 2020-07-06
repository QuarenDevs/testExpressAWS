require('dotenv').config()

const app = require('./app');
const connectDB = require('./db/mongodb.js')
const { appConfig, dbConfig } = require('./config')


async function initApp (appConfig, dbConfig)
{
    try{
        await connectDB(dbConfig)
        app.listen (appConfig.port, () => console.log ("=".repeat(100) + `\n\nStarting server, listening at ${appConfig.port} port`))
    }
    catch (err)
    {
        console.error(err)
        process.exit(0)
    }
}

initApp(appConfig, dbConfig)